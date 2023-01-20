import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

interface BookedSeat {
  id: number;
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
export class BookedSeatsService {
  private http = inject(HttpClient);
  private bookedSeats$$ = new BehaviorSubject<BookedSeat[]>([]);

  get reservedSeats$() {
    return this.bookedSeats$$.asObservable();
  }

  getBookedSeats(showingId: number) {
    this.http
      .get<BookedSeat[]>(
        `http://localhost:3000/bookedSeats?showingID=${showingId}`
      )
      .pipe(
        tap({
          next: (seatsList) => {
            this.bookedSeats$$.next([...seatsList]);
          },
        })
      )
      .subscribe();
  }
  bookSeat(
    rowSeat: string,
    columnSeat: number,
    ticketTypeName: string,
    ticketPrice: number,
    userID: number,
    showingID: number
  ) {
    if (!userID) {
      userID = -1;
    }

    this.http
      .post<BookedSeat>('http://localhost:3000/bookedSeats', {
        rowSeat,
        columnSeat,
        ticketTypeName,
        ticketPrice,
        showingID,
        userID,
      })
      .pipe(
        tap({
          next: (response) => {
            this.bookedSeats$$.next([...this.bookedSeats$$.value, response]);
          },
        })
      )
      .subscribe();
  }

  canBook(row: string, column: number): boolean {
    return this.bookedSeats$$.value.some(
      (element) => element.rowSeat === row && element.columnSeat === column
    );
  }
}
