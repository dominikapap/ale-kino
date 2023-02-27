import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import * as moment from 'moment';
import { map, Observable, tap } from 'rxjs';
import { DatesService } from 'src/app/domains/movies';
import { MovieShowing } from 'src/app/shared/interfaces/MovieShowing';
import { MovieDetails } from '../../domains/movies/movie-details/MovieDetails.interface';
import { TimeslotShowingsStateService } from './timeslot-showings.state.service';

export interface ScreeningHall {
  id: number;
  name: string;
  rows: number;
  columns: number;
}

@Injectable({
  providedIn: 'root',
})
export class ShowingsApiService {
  private http = inject(HttpClient);
  private currDay = inject(DatesService).getCurrentDay();
  private timeslotShowingsStateServive = inject(TimeslotShowingsStateService);

  getMovies(): Observable<MovieDetails[]> {
    return this.http.get<MovieDetails[]>('/movies');
  }
  getHalls(): Observable<ScreeningHall[]> {
    return this.http.get<ScreeningHall[]>('/screeningHalls');
  }

  add(showingData: Partial<MovieShowing>) {
    return this.http.post<MovieShowing>('/showings', {
      movieId: showingData.movieId,
      movieTitle: showingData.movieTitle,
      date: showingData.date,
      break: showingData.break,
      timeFrom: showingData.timeFrom,
      timeTo: showingData.timeTo,
      hallAvailableAfter: showingData.hallAvailableAfter,
      hallId: showingData.hallId,
      rows: showingData.rows,
      columns: showingData.columns,
    });
  }

  getShowings() {
    return this.http.get<MovieShowing[]>(
      `/showings?date_gte=${this.currDay}&_sort=date&_order=asc`
    );
  }

  getShowingsWithParams(formValue: MovieShowing) {
    const date = moment(formValue.date, 'MM-DD-YYYY').format().slice(0, 10);
    return this.http
      .get<MovieShowing[]>(
        `/showings?date_like=${date}&hallId=${formValue.hallId}`
      )
      .pipe(
        map((showing) =>
          showing.filter(
            (item) =>
              (formValue.timeFrom > item.timeFrom &&
                formValue.timeFrom < item.hallAvailableAfter) ||
              (formValue.hallAvailableAfter > item.timeFrom &&
                formValue.hallAvailableAfter < item.hallAvailableAfter) ||
              (formValue.timeFrom < item.timeFrom &&
                formValue.hallAvailableAfter > item.hallAvailableAfter)
          )
        ),
        tap((result) => this.timeslotShowingsStateServive.update(result))
      );
  }
}
