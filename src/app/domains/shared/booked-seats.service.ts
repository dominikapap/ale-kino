import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { CartService, TD2 } from '../cart/cart.service';
import { ReservedSeatsService } from '../tickets/reserved-seats.service';

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
  private cartService = inject(CartService);
  private reservedSeatsService = inject(ReservedSeatsService);
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
  bookSeat(ticket: TD2) {
    this.http
      .post<BookedSeat>('http://localhost:3000/bookedSeats', {
        rowSeat: ticket.rowSeat,
        columnSeat: ticket.columnSeat,
        ticketTypeName: ticket.ticketTypeName,
        ticketPrice: ticket.ticketPrice,
        showingID: ticket.showingId,
        userID: ticket.userID,
      })
      .pipe(
        tap({
          next: (response) => {
            this.bookedSeats$$.next([...this.bookedSeats$$.value, response]);
            this.cartService.removeFromCart(ticket.id!, ticket.userID!);
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
