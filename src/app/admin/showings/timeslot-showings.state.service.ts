import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { MovieShowing } from 'src/app/shared/interfaces/MovieShowing';

@Injectable({
  providedIn: 'root',
})
export class TimeslotShowingsStateService {
  private timeslotShowings$$ = new ReplaySubject<MovieShowing[]>(1);

  get timeslotShowings$() {
    return this.timeslotShowings$$.asObservable();
  }

  update(showings: MovieShowing[]) {
    this.timeslotShowings$$.next(showings);
  }
}
