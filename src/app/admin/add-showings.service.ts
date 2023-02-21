import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { MovieShowing } from '../shared/interfaces/MovieShowing';

@Injectable({
  providedIn: 'root',
})
export class AddShowingsService {
  private http = inject(HttpClient);
  private showings$$ = new BehaviorSubject<MovieShowing[]>([]);

  add(showingData: Partial<MovieShowing>) {
    this.http
      .post<MovieShowing>('/showings', {
        movieId: showingData.movieId,
        movieTitle: showingData.movieTitle,
        date: showingData.date,
        break: showingData.break,
        timeFrom: showingData.timeFrom,
        timeTo: showingData.timeTo,
        hallId: showingData.hallId,
        rows: showingData.rows,
        columns: showingData.columns,
      })
      .pipe(
        tap({
          next: (showing: MovieShowing) =>
            this.showings$$.next([...this.showings$$.value, showing]),
        })
      )
      .subscribe();
  }
}
