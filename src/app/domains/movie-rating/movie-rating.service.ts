import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { UserStateService } from 'src/app/core/user.state.service';

interface MovieRatings {
  id: number;
  movieId: number;
  userID: number;
  rating: number;
}

@Injectable()
export class MovieRatingService {
  private http = inject(HttpClient);
  private movieRating$$ = new BehaviorSubject<MovieRatings[]>([]);

  userID = inject(UserStateService).getUserID();

  get movieRating$() {
    return this.movieRating$$.asObservable();
  }
  get movieRatingList$() {
    return this.movieRating$.pipe(map((item) => item.map((i) => i.rating)));
  }

  getMovieRatings(movieId: number) {
    return this.http
      .get<MovieRatings[]>(`/movieRatings?movieId=${movieId}`)
      .pipe(
        tap({
          next: (result) => this.movieRating$$.next(result),
        })
      )
      .subscribe();
  }

  updateMovieRating(userID: number, userRating: number, movieID: number) {
    return this.http
      .post<MovieRatings>(`/movieRatings`, {
        movieId: movieID,
        userID: userID,
        rating: userRating,
      })
      .pipe(
        tap({
          next: (result) => {
            this.movieRating$$.next([...this.movieRating$$.value, result]);
          },
        })
      )
      .subscribe();
  }

  checkIfUserRated(): boolean {
    if (
      this.movieRating$$.value.filter(
        (element: MovieRatings) => element.userID == this.userID
      ).length > 0
    ) {
      return true;
    } else {
      return false;
    }
  }
}
