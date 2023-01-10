import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, of, switchMap } from 'rxjs';
import { UserStateService } from '../../core/user-state.service';
interface WatchListItem {
  id: 1;
  userID: 168395;
  movieID: 1267943;
  movieTitle: 'Apokawixa';
}
@Injectable({
  providedIn: 'root',
})
export class WatchListService {
  private watchList$$ = new BehaviorSubject<
    { title: string; titleId: number }[]
  >([]);
  watchList$ = this.watchList$$.asObservable();

  constructor() {
    // this.fetchWatchList();
    this.getWatchList();
  }
  private http = inject(HttpClient);
  private currentUserID$ = inject(UserStateService).user$;

  // changewatchList(title: string) {
  //   this.watchListSource.next(title);
  // }

  // fetchWatchList() {
  //   const userID = this.userStateService.getUserID();
  //   return this.http
  //     .get<WatchListItem[]>(`http://localhost:3000/watchlist?userID=${userID}`)
  //     .pipe(map((result) => result.map((res) => res.movieTitle)))
  //     .subscribe((result) => {
  //       this.watchList$$.next([...this.watchList$$.value, ...result]);
  //     });
  // }

  getWatchList() {
    console.log('getting watchlist');
    this.currentUserID$
      .pipe(
        switchMap((user) => {
          return this.http.get<WatchListItem[]>(
            `http://localhost:3000/watchlist?userID=${user.userID}`
          );
        }),
        map((result) =>
          result.map((res) => {
            return { title: res.movieTitle, titleId: res.id };
          })
        )
      )
      .subscribe((myWatchlist) => this.watchList$$.next(myWatchlist));
  }

  addToWatchlist(movieTitle: string, movieID: number) {
    if (this.watchList$$.value.some((item) => item.title === movieTitle)) {
      alert('movie already on the watchlist');
    } else {
      this.currentUserID$
        .pipe(
          switchMap((user) => {
            return this.http.post<WatchListItem>(
              `http://localhost:3000/watchlist`,
              {
                userID: user.userID,
                movieID: movieID,
                movieTitle: movieTitle,
              }
            );
          })
        )
        .subscribe({
          next: (response) =>
            this.watchList$$.next([
              ...this.watchList$$.value,
              { title: movieTitle, titleId: response.id },
            ]),
          error: (error) => {
            console.error('There was an error!', error);
          },
        });
      // this.getWatchList();
    }
  }

  // removeFromWatchlist(movieTitle: string) {
  //   this.currentUserID$
  //     .pipe(
  //       switchMap((user) => {
  //         return this.http.delete(
  //           `http://localhost:3000/users/${user.userID}/watchlist`
  //         );
  //       })
  //     )
  //     .subscribe((result) => console.log(result));
  // }

  // removeFromWatchlist(titleId: number) {
  //   this.http.delete(`http://localhost:3000/watchlist/${titleId}`).subscribe();
  //   this.watchList$$.next(
  //     this.watchList$$.value.filter((item) => item.titleId !== titleId)
  //   );
  // }

  removeFromWatchlist(titleId: number) {
    this.http.delete(`http://localhost:3000/watchlist/${titleId}`).subscribe({
      next: () =>
        this.watchList$$.next(
          this.watchList$$.value.filter((item) => item.titleId !== titleId)
        ),
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }
}
