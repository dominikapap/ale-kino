import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieRating } from '../interfaces/MovieRating';

@Injectable({
  providedIn: 'root',
})
export class MovieRatingService {
  constructor(private http: HttpClient) {}

  getMovieRating(movieId: number): Observable<MovieRating[]> {
    return this.http.get<MovieRating[]>(
      `http://localhost:3000/movieRating?movieId=${movieId}`
    );
  }
}
