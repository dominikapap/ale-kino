import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MovieDetails } from '../interfaces/MovieDetails';
import { PaidSeat } from '../interfaces/PaidSeats';
import { TicketType } from '../interfaces/TicketType';
import { MovieApiService } from '../services/movieapi.service';

interface TicketForm {
  ticketType: FormControl<string>;
  rowSeat: FormControl<string>;
  columnSeat: FormControl<number>;
}

type Form2 = FormGroup<{
  tickets: FormArray<FormGroup<TicketForm>>;
}>;

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent implements OnInit {
  showing: any;
  movie: any;
  rows: number[] = [];
  columns: number[] = [];
  rowsA: string[] = [];
  paidSeats: PaidSeat[] = [];
  ticketsForm = this.createForm();
  ticketTypes: TicketType[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieApiService: MovieApiService,
    private builder: NonNullableFormBuilder
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const showingIdFromRoute = Number(routeParams.get('id'));
    // this.currentShowing.currentShowingInfo$.subscribe(
    //   (element) => (this.showing = element)
    // );
    // console.log(this.showing);

    this.movieApiService.getMovieApiDataTicketTypes().subscribe({
      next: (response) => (this.ticketTypes = response),
    });
    this.movieApiService.getMovieApiDataShowing(showingIdFromRoute).subscribe({
      next: (response) => {
        this.showing = response;
        this.columns = [...Array(parseInt(this.showing[0].columns)).keys()];
        this.rows = Array.from(Array(this.showing[0].rows)).map(
          (e, i) => i + 65
        );
        this.rowsA = this.rows.map((x) => String.fromCharCode(x));
        this.paidSeats = this.showing[0].paidSeats;
        console.log(this.paidSeats);
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

  checkPaidSeat(row: string, column: number) {
    let filteredSeats = this.paidSeats.filter(
      (el) => el.row == row && el.num == column
    );
    return filteredSeats.length;
  }

  addTicket(row: string, column: number) {
    this.ticketsForm.controls.tickets.push(this.createTicketsForm(row, column));
  }

  private createForm(): Form2 {
    const form = this.builder.group({
      tickets: this.builder.array<FormGroup<TicketForm>>([]),
    });
    return form;
  }

  private createTicketsForm(row: string, column: number) {
    return this.builder.group<TicketForm>({
      ticketType: this.builder.control('Bilet normalny'),
      rowSeat: this.builder.control(row),
      columnSeat: this.builder.control(column),
    });
  }
}
