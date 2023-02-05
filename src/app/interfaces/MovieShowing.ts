export interface MovieShowing {
  id: number;
  movieId: number;
  movieTitle: string;
  date: string;
  break: number;
  timeFrom: string;
  timeTo: string;
  rows: number;
  columns: number;
  numOfSeats: number;
  hallId: number;
}
