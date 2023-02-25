import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { MovieDetails } from './MovieDetails.interface';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailsService {
  private http = inject(HttpClient);

  getMovieDetails(movieId: string): Observable<MovieDetails> {
    return this.http
      .get<MovieDetails[]>(`/movies?id=${movieId}`)
      .pipe(map((result) => result[0]));
  }
}
