import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetails } from '../interfaces/MovieDetails';
import { MovieApiService } from '../services/movieapi.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent implements OnInit {
  showing: any;
  movie: any;
  rows: number[] = [];
  constructor(
    private route: ActivatedRoute,
    private movieApiService: MovieApiService
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const showingIdFromRoute = Number(routeParams.get('id'));
    // this.currentShowing.currentShowingInfo$.subscribe(
    //   (element) => (this.showing = element)
    // );
    // console.log(this.showing);
    this.movieApiService.getMovieApiDataShowing(showingIdFromRoute).subscribe({
      next: (response) => {
        this.showing = response;
        for (let i = 0; i < this.showing[0].rows; i++) {
          this.rows.push(i);
        }
        console.log(this.rows);

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
}
