import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserStateService } from 'src/app/core/user-state.service';
import { MovieDetails } from '../../interfaces/MovieDetails';
import { MovieShowing } from '../../interfaces/MovieShowing';
import { PaidSeat } from '../../interfaces/PaidSeats';
import { TicketType } from '../../interfaces/TicketType';
import { MovieApiService } from '../../services/movieapi.service';
import { CartService } from '../cart/cart.service';
import { BookedSeatsService } from '../shared/booked-seats.service';
import { ReservedSeatsService } from './reserved-seats.service';

type Form = FormGroup<{
  tickets: FormArray<FormGroup<TicketForm>>;
}>;

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
  private route = inject(ActivatedRoute);
  private movieApiService = inject(MovieApiService);
  private cartService = inject(CartService);
  private builder = inject(NonNullableFormBuilder);
  private userID = inject(UserStateService).getUserID();
  private reservedSeatsService = inject(ReservedSeatsService);
  private bookedSeatsService = inject(BookedSeatsService);

  showing: MovieShowing[] = [];
  movie: MovieDetails[] = [];
  rows: number[] = [];
  columns: number[] = [];
  rowsA: string[] = [];
  paidSeats: PaidSeat[] = [];
  ticketsForm = this.createForm();
  // ticketTypes: TicketType[] = [];
  ticketTypes = [
    {
      name: 'Bilet normalny',
      price: 22,
    },
    {
      name: 'Bilet rodzinny',
      price: 18,
    },
    {
      name: 'Bilet ulgowy',
      price: 17,
    },
    {
      name: 'Voucher',
      price: 22,
    },
  ];
  ticketPrice = 0;
  routeParams = this.route.snapshot.paramMap;
  showingIdFromRoute = Number(this.routeParams.get('id'));
  totalPrice = 0;

  ngOnInit(): void {
    this.reservedSeatsService.getReservedSeats(this.showingIdFromRoute);
    this.bookedSeatsService.getBookedSeats(this.showingIdFromRoute);

    // przenieść subscribe do serwisu
    // this.movieApiService.getMovieApiDataTicketTypes().subscribe({
    //   next: (response) => {
    //     (this.ticketTypes = response)
    //   },
    // });

    // this.ticketsForm.valueChanges.subscribe(() => {
    //   this.totalPrice = 0;
    //   this.ticketsForm.value.tickets!.forEach((element) => {
    //     this.totalPrice += element.ticketPrice!;
    //   });
    // });

    ///tu powinno być switchMap, todo: refactor
    this.movieApiService
      .getMovieApiDataShowing(this.showingIdFromRoute)
      .subscribe({
        next: (response) => {
          this.showing = response;
          this.createSeatsGrid(this.showing);
          this.paidSeats = this.showing[0].paidSeats;

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

  changePrice(index: number) {
    this.ticketsForm.controls.tickets
      .at(index)
      .get('ticketPrice')
      ?.setValue(30);
  }

  onCheckReservedSeats(row: string, column: number): boolean {
    return this.reservedSeatsService.canReserve(row, column);
  }

  onCheckBookedSeats(row: string, column: number): boolean {
    return this.bookedSeatsService.canBook(row, column);
  }

  private createSeatsGrid(showing: MovieShowing[]) {
    this.columns = [...Array(showing[0].columns + 1).keys()];
    this.columns.shift();
    this.rows = Array.from(Array(showing[0].rows)).map((e, i) => i + 65);
    this.rowsA = this.rows.map((x) => String.fromCharCode(x));
  }

  onReserveSeat(row: string, column: number) {
    if (
      !this.reservedSeatsService.canReserve(row, column) &&
      this.ticketsForm.controls.tickets.length < 10
    ) {
      this.ticketsForm.controls.tickets.push(
        this.createTicketsForm(row, column)
      );
      this.reservedSeatsService.reserveSeat(
        row,
        column,
        this.userID,
        this.showingIdFromRoute
      );
    } else {
      alert('Nie można zarezerować więcej niż 10 billetów jednocześnie');
    }
  }

  onSubmit() {
    console.log(this.ticketsForm.value.tickets);

    if (this.ticketsForm.value.tickets) {
      this.cartService.addToCart(
        Array.from(this.ticketsForm.value.tickets),
        this.userID,
        this.showingIdFromRoute
      );
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
