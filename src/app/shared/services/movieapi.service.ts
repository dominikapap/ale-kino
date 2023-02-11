import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MovieDetails } from '../interfaces/MovieDetails';
import { MovieShowing } from '../interfaces/MovieShowing';
import { TicketType } from '../interfaces/TicketType';
import { DatesService } from './dates.service';

@Injectable({
  providedIn: 'root',
})
export class MovieApiService {
  private http = inject(HttpClient);
  private datesService = inject(DatesService);
  currDay = this.datesService.getCurrentDay();

  getShowings(): Observable<MovieShowing[]> {
    return this.http.get<MovieShowing[]>('/showings');
  }

  getMovieApiDataShowing(showingId: number): Observable<MovieShowing[]> {
    return this.http.get<MovieShowing[]>(`/showings?id=${showingId}`);
  }

  getMovieDetails(movieId: number): Observable<MovieDetails> {
    return this.http
      .get<MovieDetails[]>(`/movies?id=${movieId}`)
      .pipe(map((result) => result[0]));
  }

  getMovieApiDataShowingForWeek(dates: string): Observable<MovieShowing> {
    return this.http.get<MovieShowing>(`/showings?date>${dates}`);
  }

  getMovieDetailsList(): Observable<MovieDetails[]> {
    return this.http.get<MovieDetails[]>('/movies');
  }

  getMovieApiDataMovie(movieId: number): Observable<MovieDetails[]> {
    return this.http.get<MovieDetails[]>(`/movies?id=${movieId}`);
  }
  getMovieApiDataTicketTypes(): Observable<TicketType[]> {
    return this.http.get<TicketType[]>(`/ticketTypes`);
  }
}
