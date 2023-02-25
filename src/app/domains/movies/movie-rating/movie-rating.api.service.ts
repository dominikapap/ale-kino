import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MovieRatings } from './MovieRatings.interface';

@Injectable()
export class MovieRatingApiService {
  private http = inject(HttpClient);

  get(movieId: string) {
    return this.http.get<MovieRatings[]>(`/movieRatings?movieId=${movieId}`);
  }

  update(userID: number, rating: number, movieId: string) {
    return this.http.post<MovieRatings>(`/movieRatings`, {
      movieId,
      userID,
      rating,
    });
  }
}
