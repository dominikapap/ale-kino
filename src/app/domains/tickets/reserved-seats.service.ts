import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, tap } from 'rxjs';

export interface ReservedSeat {
  rowSeat: string;
  columnSeat: number;
  showingID: number;
  userID: number;
}
interface BookedTicket {
  id?: number;
  ticketTypeName: string;
  ticketPrice: number;
  rowSeat: string;
  columnSeat: number;
  showingID: number;
  userID: number | undefined;
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
        `http://localhost:3000/reservedSeats?showingsID=${showingId}`
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

  // checkReservedSeats(row: string, column: number):boolean {
  //   let canReserve: boolean;
  //   this.reservedSeats$$
  //     .pipe(
  //       map((element) =>
  //         element.map((el) =>
  //           el.rowSeat === row && el.columnSeat === column ? true : false
  //         )
  //       ), tap((result) => {
  //       canReserve = result[0];
  //       return canReserve
  //     })
  //     )

  // }

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
    console.log(this.reservedSeats$$.value);
  }
}
