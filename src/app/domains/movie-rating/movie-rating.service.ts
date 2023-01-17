import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { UserStateService } from 'src/app/core/user-state.service';

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
  private movieRating$$ = new BehaviorSubject<{ rating: number }>({
    rating: 0,
  });
  // currentRating = 0;
  userID = inject(UserStateService).getUserID();
  movieRatings: MovieRatings[] = [];

  get movieRating$() {
    return this.movieRating$$.asObservable();
  }

  getMovieRatings(movieId: number) {
    let currentRating = 0;
    this.http
      .get<MovieRatings[]>(
        `http://localhost:3000/movieRatings?movieId=${movieId}`
      )
      .subscribe((response: MovieRatings[]) => {
        this.movieRatings = response;
        //get average rating from all records
        response.forEach((element) => {
          currentRating += element.rating;
        });
        currentRating /= response.length;
        //update state
        this.movieRating$$.next({
          ...this.movieRating$$,
          rating: currentRating,
        });
      });
  }

  updateMovieRating(userID: number, userRating: number, movieID: number) {
    return this.http
      .post(`http://localhost:3000/movieRatings`, {
        movieId: movieID,
        userID: userID,
        rating: userRating,
      })
      .pipe(
        tap({
          next: () => {
            this.getMovieRatings(movieID);
          },
        })
      )
      .subscribe();
  }

  // updateMovieRating(userID: number, userRating: number, movieID: number) {
  //   return this.http
  //     .post(`http://localhost:3000/movieRatings`, {
  //       movieId: movieID,
  //       userID: userID,
  //       rating: userRating,
  //     })
  //     .subscribe({
  //       next: () => {
  //         this.getMovieRatings(movieID);
  //       },
  //     });
  // }

  // getCurrentRating(ratings: MovieRatings[]) {
  //   ratings.forEach((element: MovieRatings) => {
  //     this.currentRating += element.rating;
  //   });
  //   this.currentRating /= ratings.length;
  // }

  checkIfUserRated(): boolean {
    if (
      this.movieRatings.filter(
        (element: MovieRatings) => element.userID == this.userID
      ).length > 0
    ) {
      return true;
    } else {
      return false;
    }
  }
  // getMovieRating(movieId: number): Observable<MovieRatings[]> {
  //   return this.http.get<MovieRatings[]>(
  //     `http://localhost:3000/movieRatings?movieId=${movieId}`
  //   );
  // }

  // getMovieRatings(movieId: number) {
  //   let currR = 0;
  //   let count = 0;
  //   this.http
  //     .get<MovieRatings[]>(
  //       `http://localhost:3000/movieRatings?movieId=${movieId}`
  //     )
  //     .pipe(
  //       map((result) =>
  //         result.map((res) => {
  //           currR += res.rating;
  //           count++;
  //         })
  //       )
  //     )
  //     .subscribe({
  //       next: () =>
  //         this.movieRating$$.next({
  //           ...this.movieRating$$,
  //           rating: currR / count,
  //         }),
  //     });
  // }
}
