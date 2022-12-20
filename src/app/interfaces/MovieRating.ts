export interface MovieRating {
  id: number;
  movieId: number;
  ratings: Ratings[];
}

export interface Ratings {
  userID: number;
  rating: number;
}
