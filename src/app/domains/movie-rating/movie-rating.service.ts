import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface MovieRatings {
  id: number;
  movieId: number;
  userID: number;
  rating: number;
}

@Injectable({
  providedIn: 'root',
})
export class MovieRatingService {
  private http = inject(HttpClient);
  private movieRating$$ = new BehaviorSubject<number>(0);
  movieRatings: MovieRatings[] = [];
  currentRating: number = 0;

  constructor() {}

  get movieRating$() {
    return this.movieRating$$.asObservable();
  }

  getMovieRating(movieId: number): Observable<MovieRatings[]> {
    return this.http.get<MovieRatings[]>(
      `http://localhost:3000/movieRatings?movieId=${movieId}`
    );
  }

  getMovieRatings(movieId: number) {
    this.http
      .get<MovieRatings[]>(
        `http://localhost:3000/movieRatings?movieId=${movieId}`
      )
      .subscribe((response: MovieRatings[]) => {
        this.movieRatings = response;
        this.getCurrentRating(this.movieRatings);
        this.movieRating$$.next(this.currentRating);
      });
  }

  updateMovieRating(userID: number, userRating: number, movieID: number) {
    return this.http.post(`http://localhost:3000/movieRatings`, {
      movieId: movieID,
      userID: userID,
      rating: userRating,
    });
  }

  getCurrentRating(ratings: MovieRatings[]) {
    ratings.forEach((element: MovieRatings) => {
      this.currentRating += element.rating;
    });
    this.currentRating /= ratings.length;
  }
}
