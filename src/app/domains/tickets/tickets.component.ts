import {
  Component,
  ElementRef,
  inject,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStateService } from 'src/app/core/user.state.service';
import { MovieDetails } from '../../shared/interfaces/MovieDetails';
import { MovieShowing } from '../../shared/interfaces/MovieShowing';
import { TicketType } from '../../shared/interfaces/TicketType';
import { MovieApiService } from '../../shared/services/movieapi.service';
import { CartService, TD2 } from '../cart/cart.service';
import { ReservedSeatsService } from './reserved-seats.service';
import { v4 as createUuidv4 } from 'uuid';

type Form = FormGroup<{
  tickets: FormArray<FormGroup<TicketForm>>;
}>;
type PricesTypes =
  | 'Bilet normalny'
  | 'Bilet ulgowy'
  | 'Bilet rodzinny'
  | 'Voucher';

interface TicketForm {
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
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent implements OnInit {
  private routeParams = inject(ActivatedRoute).snapshot.paramMap;
  private movieApiService = inject(MovieApiService);
  private cartService = inject(CartService);
  private userService = inject(UserStateService);
  private builder = inject(NonNullableFormBuilder);
  private userID = inject(UserStateService).getUserID();
  private router = inject(Router);
  private reservedSeatsService = inject(ReservedSeatsService);
  private readonly MAX_TICKETS_COUNT = 10;
  ticketPrices = {
    'Bilet normalny': 22,
    'Bilet ulgowy': 17,
    'Bilet rodzinny': 18,
    Voucher: 22,
  };
  showing: MovieShowing[] = [];
  movie: MovieDetails[] = [];
  ticketsForm = this.createForm();
  ticketTypes: TicketType[] = [];
  showingIdFromRoute = Number(this.routeParams.get('id'));
  totalPrice = 0;
  @ViewChildren('myDiv')
  myDiv!: QueryList<ElementRef>;

  ngOnInit(): void {
    // przenieść subscribe do serwisu
    this.movieApiService.getMovieApiDataTicketTypes().subscribe({
      next: (response) => {
        this.ticketTypes = response;
      },
    });

    ///tu powinno być switchMap, todo: refactor
    this.movieApiService
      .getMovieApiDataShowing(this.showingIdFromRoute)
      .subscribe({
        next: (response) => {
          this.showing = response;
          this.movieApiService
            .getMovieApiDataMovie(this.showing[0].movieId)
            .subscribe({
              next: (response) => {
                this.movie = response;
              },
            });
        },
      });

    //to fix: tickets load only if website accessed from cart, not if refreshed
    this.setTicketsFromCart();
  }

  removeTicket(index: number, row: string, column: number) {
    console.log(this.ticketsForm.controls.tickets.at(index).value.id);
    this.ticketsForm.controls.tickets.removeAt(index);
    this.reservedSeatsService.removeSeat(row, column, this.showingIdFromRoute);

    //to fix: remove tickets from cart
    // if (this.ticketsForm.controls.tickets.at(index).controls.inCart.value) {
    //   this.cartService.removeFromCart(
    //     this.ticketsForm.controls.tickets.at(index).controls.id.value,
    //     this.ticketsForm.controls.tickets.at(index).controls.userID.value
    //   );
    // }
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

  onSubmit() {
    if (this.ticketsForm.value.tickets) {
      this.cartService.addToCart(
        this.ticketsForm.value.tickets,
        this.userService.getUserID()
      );

      if (
        window.confirm(
          'Bilety dodano do koszya, czy chcesz przejść do zamówienia?'
        )
      ) {
        this.router.navigate(['/zamowienie']);
      }
    }
  }

  private updateTotalPrice() {
    this.totalPrice = 0;
    for (const control of this.ticketsForm.controls.tickets.controls) {
      this.totalPrice += control.value.ticketPrice!;
    }
  }

  private createForm(): Form {
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
      rowSeat: this.builder.control(row),
      columnSeat: this.builder.control(column),
      userID: this.builder.control(userID),
      showingId: this.builder.control(showingId),
      id: this.builder.control(id),
      ticketTypeName: this.builder.control(ticketTypeName),
      ticketPrice: this.builder.control(ticketPrice),
      inCart: this.builder.control(inCart),
    });
  }

  private setTicketsFromCart() {
    this.cartService.cartValue.forEach((ticket) => {
      if (ticket.showingId === this.showingIdFromRoute) {
        this.ticketsForm.controls.tickets.push(
          this.createTicketsForm(
            ticket.rowSeat!,
            ticket.columnSeat!,
            ticket.userID!,
            ticket.showingId!,
            ticket.id!,
            ticket.ticketTypeName!,
            ticket.ticketPrice,
            ticket.inCart
          )
        );
      }
    });
    this.updateTotalPrice();
  }

  removeReserved() {
    this.myDiv.forEach((div: ElementRef) => {
      setTimeout(() => {
        div.nativeElement.click();
        console.log('clicked');
      }, 1000);
    });
  }

  ngOnDestroy() {
    this.removeReserved();
  }
}
