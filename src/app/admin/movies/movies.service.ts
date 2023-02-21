import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MovieDetails } from 'src/app/domains/movies/movie-details/MovieDetails.interface';
import { MoviesApiService } from './movies-api.service';
import { MoviesActions } from './store/movies.actions';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private moviesApiService = inject(MoviesApiService);
  private store = inject(Store);

  add(formValue: Partial<MovieDetails>) {
    this.moviesApiService.add(formValue).subscribe({
      next: (result) => {
        this.store.dispatch(MoviesActions.addNewMovie(result));
      },
    });
  }
  getMovies() {
    this.moviesApiService.getMovies().subscribe({
      next: (moviesList) =>
        this.store.dispatch(MoviesActions.getAllMovies({ moviesList })),
    });
  }
}
