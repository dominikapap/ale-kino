import { Component, inject, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieDetails } from 'src/app/interfaces/MovieDetails';
import { MovieApiService } from 'src/app/services/movieapi.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent {
  @Input() movieId = 0;

  private showingService = inject(MovieApiService);
  movieDetails!: Observable<MovieDetails>;

  ngOnInit() {
    this.movieDetails = this.showingService.getMovieDetails(this.movieId);
  }
}
