import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { MovieShowing } from 'src/app/shared/interfaces/MovieShowing';

export interface SeatGridElements {
  columns: number[];
  rows: string[];
}

@Injectable({
  providedIn: 'root',
})
export class CreateSeatGridStateService {
  private http = inject(HttpClient);
  private seatGrid$$ = new BehaviorSubject<SeatGridElements>({
    columns: [],
    rows: [],
  });
  rows: number[] = [];
  columns: number[] = [];
  rowsA: string[] = [];

  get seatGrid$() {
    return this.seatGrid$$.asObservable();
  }
  get seatGridColumns$() {
    return this.seatGrid$.pipe(map((grid) => grid.columns));
  }

  get seatGridRows$() {
    return this.seatGrid$.pipe(map((grid) => grid.rows));
  }

  getSeatGrid(showingId: number) {
    this.http
      .get<MovieShowing[]>(`/showings?id=${showingId}`)
      .pipe(
        tap({
          next: (response: MovieShowing[]) => {
            this.createSeatsGrid(response);
          },
        })
      )
      .subscribe();
  }

  private createSeatsGrid(showing: MovieShowing[]) {
    this.columns = [...Array(showing[0].columns + 1).keys()];
    this.columns.shift();
    this.rows = Array.from(Array(showing[0].rows)).map((e, i) => i + 65);
    this.rowsA = this.rows.map((x) => String.fromCharCode(x));
    this.seatGrid$$.next({ columns: this.columns, rows: this.rowsA });
  }
}
