import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieDetails } from '../interfaces/MovieDetails';
import { MovieShowing } from '../interfaces/MovieShowing';
import { TicketType } from '../interfaces/TicketType';

@Injectable({
  providedIn: 'root',
})
export class MovieApiService {
  constructor(private http: HttpClient) {}
  getMovieApiDataShowings(): Observable<MovieShowing[]> {
    return this.http.get<MovieShowing[]>('http://localhost:3000/showings');
  }
  getMovieApiDataShowing(showingId: number): Observable<MovieShowing> {
    return this.http.get<MovieShowing>(
      `http://localhost:3000/showings?id=${showingId}`
    );
  }

  getMovieApiDataShowingForWeek(dates: string): Observable<MovieShowing> {
    return this.http.get<MovieShowing>(
      `http://localhost:3000/showings?date>${dates}`
    );
  }

  getMovieApiDataMovieDetails(): Observable<MovieDetails[]> {
    return this.http.get<MovieDetails[]>('http://localhost:3000/movies');
  }

  getMovieApiDataMovie(movieId: number): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(
      `http://localhost:3000/movies?id=${movieId}`
    );
  }
  getMovieApiDataTicketTypes(): Observable<TicketType[]> {
    return this.http.get<TicketType[]>(`http://localhost:3000/ticketTypes`);
  }
}
