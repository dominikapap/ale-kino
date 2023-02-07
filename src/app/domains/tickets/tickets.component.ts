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
import { ActivatedRoute } from '@angular/router';
import { UserStateService } from 'src/app/core/user.state.service';
import { MovieDetails } from '../../interfaces/MovieDetails';
import { MovieShowing } from '../../interfaces/MovieShowing';
import { TicketType } from '../../interfaces/TicketType';
import { MovieApiService } from '../../services/movieapi.service';
import { CartService } from '../cart/cart.service';
import { ReservedSeatsService } from './reserved-seats.service';
import { v4 as createUuidv4 } from 'uuid';
import { AuthStateService } from 'src/app/auth';

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
  private auth = inject(AuthStateService);
  private builder = inject(NonNullableFormBuilder);
  private userID = inject(UserStateService).getUserID();
  private reservedSeatsService = inject(ReservedSeatsService);
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

    //to do tickets load only if website accessed from cart
    this.setTicketsFromCart();
  }

  removeTicket(index: number, row: string, column: number) {
    this.ticketsForm.controls.tickets.removeAt(index);
    this.reservedSeatsService.removeSeat(row, column);
  }

  updatePrice(index: number, event: { value: PricesTypes }) {
    this.ticketsForm.controls.tickets
      .at(index)
      .patchValue({ ticketPrice: this.ticketPrices[event.value] });
    this.updateTotalPrice();
  }
  onReserveSeat(row: string, column: number) {
    if (this.ticketsForm.controls.tickets.length < 10) {
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
      alert('Nie można zarezerować więcej niż 10 billetów jednocześnie');
    }
  }

  onSubmit() {
    if (this.ticketsForm.value.tickets) {
      this.cartService.addToCart(
        this.ticketsForm.value.tickets,
        this.userService.getUserID()
      );
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
    ticketPrice = 22
  ) {
    return this.builder.group<TicketForm>({
      rowSeat: this.builder.control(row),
      columnSeat: this.builder.control(column),
      userID: this.builder.control(userID),
      showingId: this.builder.control(showingId),
      id: this.builder.control(id),
      ticketTypeName: this.builder.control(ticketTypeName),
      ticketPrice: this.builder.control(ticketPrice),
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
            ticket.ticketPrice
          )
        );
      }
    });
    this.updateTotalPrice();
  }

  test() {
    this.myDiv.forEach((div: ElementRef) => {
      setTimeout(() => {
        div.nativeElement.click();
        console.log('clicked');
      }, 5000);
    });
  }
}
