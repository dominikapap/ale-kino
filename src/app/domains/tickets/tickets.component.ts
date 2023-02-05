import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStateService } from 'src/app/core/user.state.service';
import { MovieDetails } from '../../interfaces/MovieDetails';
import { MovieShowing } from '../../interfaces/MovieShowing';
import { TicketType } from '../../interfaces/TicketType';
import { MovieApiService } from '../../services/movieapi.service';
import { CartService } from '../cart/cart.service';
import { ReservedSeatsService } from './reserved-seats.service';

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
  selected = 'Bilet normalny';
  ticketTypes: TicketType[] = [];
  showingIdFromRoute = Number(this.routeParams.get('id'));
  totalPrice = 0;

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

  emptyCart() {
    this.cartService.emptyCart();
  }

  onSubmit() {
    if (this.ticketsForm.value.tickets) {
      this.cartService.addToCart(
        Array.from(this.ticketsForm.value.tickets),
        this.userID,
        this.showingIdFromRoute
      );
      //   this.router.navigate(['koszyk']);
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

  private createTicketsForm(row: string, column: number) {
    return this.builder.group<TicketForm>({
      ticketTypeName: this.builder.control('Bilet normalny'),
      ticketPrice: this.builder.control(22),
      rowSeat: this.builder.control(row),
      columnSeat: this.builder.control(column),
    });
  }
}
