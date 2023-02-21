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
export class MoviesApiService {
  private http = inject(HttpClient);

  getMovies$(): Observable<MovieDetails[]> {
    return this.http.get<MovieDetails[]>('/movies');
  }
  getHalls$(): Observable<ScreeningHall[]> {
    return this.http.get<ScreeningHall[]>('/screeningHalls');
  }

  add(movieData: Partial<MovieDetails>) {
    return this.http.post<MovieDetails>('/movies', {
      title: movieData.title,
    });
  }

  getMovies() {
    return this.http.get<MovieDetails[]>(`/movies`);
  }
}
