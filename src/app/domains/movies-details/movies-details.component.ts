import { Component, OnInit } from '@angular/core';
import { MovieDetails } from '../../interfaces/MovieDetails';
import { DatesService } from '../../services/dates.service';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies-details',
  //templateUrl: './movies-details.component.html',
  template: 'hello',
  styleUrls: ['./movies-details.component.css'],
})
export class MoviesDetailsComponent {
  constructor(
    private moviesService: MoviesService,
    private datesService: DatesService
  ) {
    // const now = new Date
    // this.movies = this.moviesService.getMovies();
  }

  showMore(): void {}

  compareHours(hour: string): boolean {
    const now = new Date();
    if (hour > `${now.getHours()}:${now.getMinutes()}`) {
      return true;
    } else {
      return false;
    }
  }

  movies: MovieDetails[] = [];
  dates: any = [];
  days: any;
}
