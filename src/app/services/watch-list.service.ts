import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WatchListService {
  // private watchListSource = new ReplaySubject<string>();
  // currentwatchList$$ = this.watchListSource.asObservable();

  constructor(private http: HttpClient) {}

  // changewatchList(title: string) {
  //   this.watchListSource.next(title);
  // }

  updateWatchlist(movieTitle: string) {
    console.log(movieTitle);
  }
}
