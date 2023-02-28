import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { ReservedSeatsApiService } from './reserved-seats.api.service';

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
  private reservedSeatsApiService = inject(ReservedSeatsApiService);
  private reservedSeats$$ = new BehaviorSubject<ReservedSeat[]>([]);

  get reservedSeats$() {
    return this.reservedSeats$$.asObservable();
  }

  getReservedSeats(showingId: number) {
    this.reservedSeatsApiService
      .getByShowing(showingId)
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

    this.reservedSeatsApiService
      .reserveSeat(rowSeat, columnSeat, userID, showingID)
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
    const seatID = showingID + row + column;
    this.reservedSeatsApiService
      .removeSeat(seatID)
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
