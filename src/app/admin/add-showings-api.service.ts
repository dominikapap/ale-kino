import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MovieDetails } from '../domains/movies/movie-details/MovieDetails.interface';

export interface ScreeningHall {
  id: number;
  name: string;
  rows: number;
  columns: number;
}

@Injectable({
  providedIn: 'root',
})
export class AddShowingsApiService {
  private http = inject(HttpClient);

  getMovies$(): Observable<MovieDetails[]> {
    return this.http.get<MovieDetails[]>('/movies');
  }
  getHalls$(): Observable<ScreeningHall[]> {
    return this.http.get<ScreeningHall[]>('/screeningHalls');
  }
}
