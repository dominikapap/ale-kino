import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { MovieDetails } from 'src/app/domains/movies/movie-details/MovieDetails.interface';

export const MoviesActions = createActionGroup({
  source: 'Movies',
  events: {
    'add new movie': props<MovieDetails>(),
    'get all movies': emptyProps(),
  },
});

export const MoviesAPIActions = createActionGroup({
  source: 'Movies API',
  events: {
    ['add new movie success']: props<MovieDetails>(),
    ['add new movie failure']: emptyProps(),
    ['get all movie success']: props<{ moviesList: MovieDetails[] }>(),
    ['get all movie failure']: emptyProps(),
  },
});
