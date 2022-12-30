import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MovieShowing } from '../interfaces/MovieShowing';

@Injectable({
  providedIn: 'root',
})
export class CurrentShowingService {
  private currentShowing$ = new BehaviorSubject({});
  currentShowingInfo$ = this.currentShowing$.asObservable();

  constructor() {}

  setCurrentShowing(data: MovieShowing) {
    this.currentShowing$.next(data);
  }
}
