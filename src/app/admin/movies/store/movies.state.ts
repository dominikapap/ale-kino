import { MovieDetails } from 'src/app/domains/movies/movie-details/MovieDetails.interface';

export interface MoviesState {
  moviesList: MovieDetails[];
}

export const moviesFeatureKey = 'moviesState';
export const initialMoviesState: {
  moviesList: MovieDetails[];
} = {
  moviesList: [],
};
