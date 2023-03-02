import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserStateService } from 'src/app/auth/user.state.service';
import { ReservedSeatsService } from './reserved-seats.state.service';
import { v4 as createUuidv4 } from 'uuid';
import { CartStateService } from '../cart/cart.state.service';
import { MovieApiService, TicketType } from '../services/movieapi.service';
import { DialogSontentService } from 'src/app/shared/services/dialog-content-service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { ShowingDetailsApiService } from '../showing-details/showing-details.api.service';
import { Subscription } from 'rxjs';
import { MovieShowing } from 'src/app/shared/interfaces/MovieShowing';

export type TicketGroupForm = FormGroup<{
  tickets: FormArray<FormGroup<TicketForm>>;
}>;
export type PricesTypes =
  | 'Bilet normalny'
  | 'Bilet ulgowy'
  | 'Bilet rodzinny'
  | 'Voucher';

type TicketPrices = {
  [ticketName: string]: number;
};
export interface TicketForm {
  ticketTypeName: FormControl<string>;
  ticketPrice: FormControl<number>;
  rowSeat: FormControl<string>;
  columnSeat: FormControl<number>;
  userID: FormControl<number>;
  showingId: FormControl<number>;
  inCart: FormControl<boolean>;
  id: FormControl<string>;
}

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnInit, OnDestroy {
  private routeParams = inject(ActivatedRoute).snapshot.paramMap;
  private movieApiService = inject(MovieApiService);
  private cartService = inject(CartStateService);
  private userService = inject(UserStateService);
  private dialogContentService = inject(DialogSontentService);
  private snackBarService = inject(SnackBarService);
  private builder = inject(NonNullableFormBuilder);
  private userID = inject(UserStateService).getUserID();
  private reservedSeatsService = inject(ReservedSeatsService);
  private showingService = inject(ShowingDetailsApiService);
  private subscriptions = new Subscription();
  private readonly MAX_TICKETS_COUNT = 10;
  cart$ = this.cartService.cart$;
  ticketPrices: TicketPrices = {};
  ticketsForm = this.createForm();
  ticketTypes: TicketType[] = [];
  showingIdFromRoute = Number(this.routeParams.get('id'));
  showingDetails$ = this.showingService.getShowingDetails(
    this.showingIdFromRoute
  );
  totalPrice = 0;

  ngOnInit(): void {
    this.movieApiService.getMovieApiDataTicketTypes().subscribe({
      next: (tickets) => {
        this.ticketPrices = tickets.reduce((acc: TicketPrices, curr) => {
          acc[curr.name] = curr.price;
          return acc;
        }, {});
        this.ticketTypes = tickets;
      },
    });

    const cartSub = this.updateTicketsFromCart();
    this.subscriptions.add(cartSub);
  }

  removeTicket(index: number, row: string, column: number) {
    this.ticketsForm.controls.tickets.removeAt(index);
    this.reservedSeatsService.removeSeat(row, column, this.showingIdFromRoute);
    this.updateTotalPrice();
  }

  updatePrice(index: number, event: { value: PricesTypes }) {
    this.ticketsForm.controls.tickets
      .at(index)
      .patchValue({ ticketPrice: this.ticketPrices[event.value] });
    this.updateTotalPrice();
  }

  onReserveSeat(row: string, column: number) {
    if (this.ticketsForm.controls.tickets.length < this.MAX_TICKETS_COUNT) {
      this.ticketsForm.controls.tickets.push(
        this.createTicketsForm(row, column)
      );

      this.reservedSeatsService.reserveSeat(
        row,
        column,
        this.userID,
        this.showingIdFromRoute
      );
      this.updateTotalPrice();
    } else {
      alert(
        `Nie można zarezerować więcej niż ${this.MAX_TICKETS_COUNT} billetów jednocześnie`
      );
    }
  }
  updateTicketsFromCart() {
    return this.cartService.cart$.subscribe({
      next: () => {
        return this.setTicketsFromCart();
      },
    });
  }
  onSubmit(showingDetails: MovieShowing) {
    if (
      this.ticketsForm.value.tickets &&
      this.ticketsForm.value.tickets.filter((item) => item.inCart === false)
        .length > 0
    ) {
      this.cartService.addToCart(
        this.ticketsForm.getRawValue().tickets,
        this.userService.getUserID(),
        showingDetails
      );
      this.setTicketsFromCart();
      this.dialogContentService.dialogInstance(
        'Bilety dodano do koszyka',
        true,
        '/checkout',
        'Przejdź do zamówienia'
      );
    } else {
      this.snackBarService.openSnackBar('Bilety już w koszyku', 3000);
    }
  }

  updateTicket(
    ticketID: string,
    ticketTypeName: string,
    ticketPrice: number,
    ticketUserID: number,
    index: number
  ) {
    this.cartService.updateTicket(
      ticketID,
      ticketTypeName,
      ticketPrice,
      ticketUserID
    );
    this.ticketsForm.controls.tickets.at(index).markAsPristine();
  }

  private updateTotalPrice() {
    this.totalPrice = 0;
    for (const control of this.ticketsForm.controls.tickets.controls) {
      this.totalPrice += control.value.ticketPrice!;
    }
  }

  private createForm(): TicketGroupForm {
    const form = this.builder.group({
      tickets: this.builder.array<FormGroup<TicketForm>>([]),
    });
    return form;
  }

  private createTicketsForm(
    row: string,
    column: number,
    userID = this.userID,
    showingId = this.showingIdFromRoute,
    id: string = createUuidv4(),
    ticketTypeName = 'Bilet normalny',
    ticketPrice = 22,
    inCart = false
  ) {
    return this.builder.group<TicketForm>({
      rowSeat: this.builder.control(row, Validators.required),
      columnSeat: this.builder.control(column, Validators.required),
      userID: this.builder.control(userID, Validators.required),
      showingId: this.builder.control(showingId, Validators.required),
      id: this.builder.control(id, Validators.required),
      ticketTypeName: this.builder.control(ticketTypeName, Validators.required),
      ticketPrice: this.builder.control(ticketPrice, Validators.required),
      inCart: this.builder.control(inCart, Validators.required),
    });
  }

  private setTicketsFromCart() {
    this.ticketsForm.controls.tickets.clear();
    this.cartService.cartValue.forEach((ticket) => {
      if (ticket.showingId === this.showingIdFromRoute) {
        this.ticketsForm.controls.tickets.push(
          this.createTicketsForm(
            ticket.rowSeat,
            ticket.columnSeat,
            ticket.userID,
            ticket.showingId,
            ticket.id,
            ticket.ticketTypeName,
            ticket.ticketPrice,
            ticket.inCart
          )
        );
      }
    });
    this.updateTotalPrice();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
