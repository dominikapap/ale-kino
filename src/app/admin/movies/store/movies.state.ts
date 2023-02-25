import { MovieDetails } from 'src/app/domains/movies/movie-details/MovieDetails.interface';
// type Id = 'id';
// export type MovieDetailsToPost = Omit<MovieDetails, Id>;

export interface MoviesState {
  moviesList: MovieDetails[];
}

export const moviesFeatureKey = 'moviesState';
export const initialMoviesState: {
  moviesList: MovieDetails[];
} = {
  moviesList: [],
};
