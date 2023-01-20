import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, switchMap, tap } from 'rxjs';

export interface ReservedSeat {
  id: number;
  rowSeat: string;
  columnSeat: number;
  showingID: number;
  userID: number;
}

@Injectable({
  providedIn: 'root',
})
export class ReservedSeatsService {
  private http = inject(HttpClient);
  private reservedSeats$$ = new BehaviorSubject<ReservedSeat[]>([]);

  get reservedSeats$() {
    return this.reservedSeats$$.asObservable();
  }

  getReservedSeats(showingId: number) {
    this.http
      .get<ReservedSeat[]>(
        `http://localhost:3000/reservedSeats?showingID=${showingId}`
      )
      .pipe(
        tap({
          next: (seatsList) => {
            this.reservedSeats$$.next([...seatsList]);
          },
        })
      )
      .subscribe();
  }

  canReserve(row: string, column: number): boolean {
    return this.reservedSeats$$.value.some(
      (element) => element.rowSeat === row && element.columnSeat === column
    );
  }

  reserveSeat(
    rowSeat: string,
    columnSeat: number,
    userID: number,
    showingID: number
  ) {
    if (!userID) {
      userID = -1;
    }

    this.http
      .post<ReservedSeat>('http://localhost:3000/reservedSeats', {
        rowSeat,
        columnSeat,
        showingID,
        userID,
      })
      .pipe(
        tap({
          next: (response) => {
            this.reservedSeats$$.next([
              ...this.reservedSeats$$.value,
              response,
            ]);
          },
        })
      )
      .subscribe();
  }

  removeSeat(row: string, column: number) {
    const seatRow = this.reservedSeats$$.value.filter(
      (seat) => seat.rowSeat === row
    );
    const seatColumn = seatRow.filter((seat) => seat.columnSeat === column);
    this.http
      .delete<ReservedSeat>(
        `http://localhost:3000/reservedSeats/${seatColumn[0].id}`
      )
      .pipe(
        tap({
          next: () => {
            this.reservedSeats$$.next(
              this.reservedSeats$$.value.filter(
                (seat) => seat.id !== seatColumn[0].id
              )
            );
          },
        })
      )
      .subscribe();
  }
}
