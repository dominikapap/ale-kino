import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DatesService } from '../services/dates.service';
import { ShowingsApiService } from './showings.api.service';
import { Repertoire } from './showings.component';

@Injectable({
  providedIn: 'root',
})
export class ShowingsStateService {
  private http = inject(HttpClient);
  private currDay = inject(DatesService).getCurrentDay();
  private showingsApiService = inject(ShowingsApiService);
  private showings$$ = new BehaviorSubject<Repertoire[]>([]);

  get showings$() {
    return this.showings$$.asObservable();
  }

  fetchShowings(date: string) {
    if (date === this.currDay) {
      this.showingsApiService.getForToday(date).subscribe({
        next: (response) => {
          this.updateShowingsState(response);
        },
        error: (e) => console.log(e),
      });
    } else {
      this.showingsApiService.getForDate(date).subscribe({
        next: (response) => {
          this.updateShowingsState(response);
        },
        error: (e) => console.log(e),
      });
    }
  }

  private updateShowingsState(showings: Repertoire[]) {
    let transformedShowings = [];
    transformedShowings = this.transformShowings(showings);
    this.showings$$.next(transformedShowings);
  }

  private transformShowings(list: any[]) {
    return list.reduce((acc, current) => {
      const existingMovie = acc.find(
        (movie: any) => movie.movieId === current.movieId
      );
      if (existingMovie) {
        existingMovie.showings.push({
          showingId: current.id,
          timeFrom: current.timeFrom,
          date: current.date,
        });
      } else {
        acc.push({
          movieId: current.movieId,
          showings: [
            {
              showingId: current.id,
              timeFrom: current.timeFrom,
              date: current.date,
            },
          ],
        });
      }
      return acc;
    }, []);
  }
}
