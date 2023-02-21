import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DatesService } from 'src/app/domains/movies';
import { MovieShowing } from 'src/app/shared/interfaces/MovieShowing';
import { MovieDetails } from '../../domains/movies/movie-details/MovieDetails.interface';

export interface ScreeningHall {
  id: number;
  name: string;
  rows: number;
  columns: number;
}

@Injectable({
  providedIn: 'root',
})
export class ShowingsApiService {
  private http = inject(HttpClient);
  private currDay = inject(DatesService).getCurrentDay();

  getMovies$(): Observable<MovieDetails[]> {
    return this.http.get<MovieDetails[]>('/movies');
  }
  getHalls$(): Observable<ScreeningHall[]> {
    return this.http.get<ScreeningHall[]>('/screeningHalls');
  }

  add(showingData: Partial<MovieShowing>) {
    return this.http.post<MovieShowing>('/showings', {
      movieId: showingData.movieId,
      movieTitle: showingData.movieTitle,
      date: showingData.date,
      break: showingData.break,
      timeFrom: showingData.timeFrom,
      timeTo: showingData.timeTo,
      hallId: showingData.hallId,
      rows: showingData.rows,
      columns: showingData.columns,
    });
  }

  getShowings() {
    return this.http.get<MovieShowing[]>(`/showings?date_gte=${this.currDay}`);
  }
}
