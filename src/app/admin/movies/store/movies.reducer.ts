/* eslint-disable @ngrx/on-function-explicit-return-type */
import { createReducer, on } from '@ngrx/store';
import { MoviesActions } from './movies.actions';
import { initialMoviesState } from './movies.state';

export const moviesReducer = createReducer(
  initialMoviesState,

  on(MoviesActions.addNewMovie, (state, action) => {
    return { ...state, moviesList: [...state.moviesList, action] };
  }),
  on(MoviesActions.getAllMovies, (state, { moviesList }) => ({
    ...state,
    moviesList: [...state.moviesList, ...moviesList],
  }))
);
