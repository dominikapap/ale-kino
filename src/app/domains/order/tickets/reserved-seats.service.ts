import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

export interface ReservedSeat {
  id: string;
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
      .get<ReservedSeat[]>(`/reservedSeats?showingID=${showingId}`)
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
      .post<ReservedSeat>('/reservedSeats', {
        rowSeat,
        columnSeat,
        showingID,
        userID,
        id: showingID + rowSeat + columnSeat,
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

  removeSeat(row: string, column: number, showingID: number) {
    // const seatRow = this.reservedSeats$$.value.filter(
    //   (seat) => seat.rowSeat === row
    // );
    // const seatColumn = seatRow.filter((seat) => seat.columnSeat === column);
    const seatID = showingID + row + column;
    this.http
      .delete<ReservedSeat>(`/reservedSeats/${seatID}`)
      .pipe(
        tap({
          next: () => {
            this.reservedSeats$$.next(
              this.reservedSeats$$.value.filter((seat) => seat.id !== seatID)
            );
          },
          error: (e) => {
            console.log(e);
          },
        })
      )
      .subscribe();
  }
}