/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { MovieShowing } from 'src/app/shared/interfaces/MovieShowing';
import { MovieDetailsService } from '../movie-details/movie-details.service';
import { DatesService } from '../services/dates.service';
import { ShowingsApiService } from './showings.api.service';
import { Repertoire } from './showings.component';

@Injectable({
  providedIn: 'root',
})
export class ShowingsStateService {
  private currDay = inject(DatesService).getCurrentDay();
  private movieDetailsService = inject(MovieDetailsService);
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

  private updateShowingsState(showings: MovieShowing[]) {
    let transformedShowings = [];
    transformedShowings = this.transformShowings(showings);
    transformedShowings.forEach((showing) =>
      this.movieDetailsService
        .get(showing.movieId)
        .subscribe((result) => (showing.movieDetails = result))
    );
    this.showings$$.next(transformedShowings);
  }

  private transformShowings(list: MovieShowing[]): Repertoire[] {
    return list.reduce<Repertoire[]>((acc, current) => {
      const existingMovie = acc.find(
        (movie) => movie.movieId === current.movieId
      );
      if (existingMovie) {
        existingMovie.showings.push({
          showingId: current.id!,
          timeFrom: current.timeFrom,
          date: current.date,
        });
      } else {
        acc.push({
          movieId: current.movieId,
          showings: [
            {
              showingId: current.id!,
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
