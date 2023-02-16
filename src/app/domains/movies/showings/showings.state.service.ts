import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DatesService } from '../services/dates.service';
import { Repertoire } from './showings.component';

@Injectable({
  providedIn: 'root',
})
export class ShowingsStateService {
  private http = inject(HttpClient);
  private currDay = inject(DatesService).getCurrentDay();
  private showings$$ = new BehaviorSubject<Repertoire[]>([]);

  get showings$() {
    return this.showings$$.asObservable();
  }

  fetchShowings(date: string) {
    if (date === this.currDay) {
      const now = new Date();
      const currHour = now.getHours();
      const currMinutes = now.getMinutes();
      this.http
        .get<Repertoire[]>(
          `/showings?date=${date}&timeFrom_gte=${currHour}:${currMinutes}`
        )
        .subscribe({
          next: (response) => {
            let transformedShowings = [];
            transformedShowings = this.transformShowings(response);
            this.showings$$.next(transformedShowings);
          },
          error: (e) => console.log(e),
        });
    } else {
      this.http.get<Repertoire[]>(`/showings?date=${date}`).subscribe({
        next: (response) => {
          let transformedShowings = [];
          transformedShowings = this.transformShowings(response);
          this.showings$$.next(transformedShowings);
        },
        error: (e) => console.log(e),
      });
    }
  }

  transformShowings(list: any[]) {
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

  filterByHour(showings: Repertoire[]) {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    const filteredList = showings.map((item) => {
      const filteredShowings = item.showings.filter((showing) => {
        const [hour, minute] = showing.timeFrom.split(':').map(Number);
        return (
          hour > currentHour || (hour === currentHour && minute > currentMinute)
        );
      });
      return { ...item, showings: filteredShowings };
    });
    showings = filteredList;
  }
}
