import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth';
import { WatchListItem } from '..';

@Injectable({
  providedIn: 'root',
})
export class WatchListApiService {
  private http = inject(HttpClient);

  getUserWatchlist(userID: number): Observable<WatchListItem[]> {
    return this.http.get<WatchListItem[]>(`/watchlist?userID=${userID}`);
  }

  post(user: User, movieTitle: string, movieID: string) {
    return this.http.post<WatchListItem>(`/watchlist`, {
      userID: user.userID,
      movieID: movieID,
      movieTitle: movieTitle,
    });
  }

  delete(titleId: string) {
    return this.http.delete<WatchListItem>(`/watchlist/${titleId}`);
  }
}
