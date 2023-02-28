import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { UserStateService } from '../../../auth/user.state.service';
import { WatchListApiService } from './watch-list.api.service';
export interface WatchListItem {
  id: string;
  userID: number;
  movieID: string;
  movieTitle: string;
}
@Injectable({
  providedIn: 'root',
})
export class WatchListStateService {
  private watchlistApiService = inject(WatchListApiService);
  private snackBarService = inject(SnackBarService);
  private currentUserID$ = inject(UserStateService).user$;
  private watchList$$ = new BehaviorSubject<
    { title: string; titleId: string }[]
  >([]);
  get watchList$() {
    return this.watchList$$.asObservable();
  }

  constructor() {
    this.getWatchList();
  }

  getWatchList() {
    this.currentUserID$
      .pipe(
        switchMap((user) =>
          this.watchlistApiService.getUserWatchlist(user.userID)
        ),
        map((result) =>
          result.map((res: { movieTitle: string; id: string }) => {
            return { title: res.movieTitle, titleId: res.id };
          })
        )
      )
      .subscribe((myWatchlist) => this.watchList$$.next(myWatchlist));
  }

  addToWatchlist(movieTitle: string, movieID: string) {
    if (this.watchList$$.value.some((item) => item.title === movieTitle)) {
      this.snackBarService.openSnackBar('Film jest już na liście', 3000);
    } else {
      this.currentUserID$
        .pipe(
          switchMap((user) =>
            this.watchlistApiService.post(user, movieTitle, movieID)
          )
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

  removeFromWatchlist(titleId: string) {
    this.watchlistApiService.delete(titleId).subscribe({
      next: () =>
        this.watchList$$.next(
          this.watchList$$.value.filter((item) => item.titleId !== titleId)
        ),
      error: (error) => {
        console.error('Coś poszło nie tak, spróbuj ponwnie później', error);
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
