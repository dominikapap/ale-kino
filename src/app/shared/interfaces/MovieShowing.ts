export interface MovieShowing {
  id?: number;
  movieId: string;
  movieTitle: string;
  date: string;
  break: number;
  timeFrom: string;
  timeTo: string;
  hallAvailableAfter: string;
  rows: number;
  columns: number;
  hallId: number;
}
