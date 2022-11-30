import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatchListService {

  private watchListSource = new ReplaySubject<string>();
  currentwatchList$$ = this.watchListSource.asObservable();

  constructor() { }

  changewatchList(title: string) {
    this.watchListSource.next(title)
  }
}
