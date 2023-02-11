import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, of, switchMap } from 'rxjs';
import { UserStateService } from '../../core/user.state.service';
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
    this.getWatchList();
  }
  private http = inject(HttpClient);
  private currentUserID$ = inject(UserStateService).user$;

  getWatchList() {
    this.currentUserID$
      .pipe(
        switchMap((user) => {
          return this.http.get<WatchListItem[]>(
            `/watchlist?userID=${user.userID}`
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
            return this.http.post<WatchListItem>(`/watchlist`, {
              userID: user.userID,
              movieID: movieID,
              movieTitle: movieTitle,
            });
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
    }
  }

  removeFromWatchlist(titleId: number) {
    this.http.delete<WatchListItem>(`/watchlist/${titleId}`).subscribe({
      next: () =>
        this.watchList$$.next(
          this.watchList$$.value.filter((item) => item.titleId !== titleId)
        ),
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  checkIfOnWatchlist(movieTitle: string): boolean {
    const filteredWatchlist = this.watchList$$.value.filter(
      (item) => item.title === movieTitle
    );
    return filteredWatchlist.length > 0;
  }
}
