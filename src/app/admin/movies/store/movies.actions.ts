import { createActionGroup, props } from '@ngrx/store';
import { MovieDetails } from 'src/app/domains/movies/movie-details/MovieDetails.interface';

export const MoviesActions = createActionGroup({
  source: 'Movies',
  events: {
    'add new movie': props<MovieDetails>(),
    'get all movies': props<{ moviesList: MovieDetails[] }>(),
    'remove movie': props<{ id: number }>(),
  },
});
