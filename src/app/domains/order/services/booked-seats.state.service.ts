import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import {
  CartStateService,
  TicketInCartDetails,
} from '../cart/cart.state.service';
import { BookedSeatsApiService } from './booked-seats.api.service';

export interface BookedSeat {
  id: number;
  ticketTypeName: string;
  ticketPrice: number;
  rowSeat: string;
  columnSeat: number;
  showingID: number;
  userID: number | undefined;
  orderID: string;
  date: string;
}

@Injectable({
  providedIn: 'root',
})
export class BookedSeatsStateService {
  private http = inject(HttpClient);
  private cartService = inject(CartStateService);
  private bookedSeatsApiService = inject(BookedSeatsApiService);
  private bookedSeats$$ = new BehaviorSubject<BookedSeat[]>([]);

  get bookedSeats$() {
    return this.bookedSeats$$.asObservable();
  }

  getBookedSeats(showingId: number) {
    this.bookedSeatsApiService
      .get(showingId)
      .pipe(
        tap({
          next: (seatsList) => {
            this.bookedSeats$$.next([...seatsList]);
          },
        })
      )
      .subscribe();
  }
  bookSeat(ticket: TicketInCartDetails, orderID: string, date: string) {
    this.bookedSeatsApiService
      .bookSeat(ticket, orderID, date)
      .pipe(
        tap({
          next: (response) => {
            this.bookedSeats$$.next([...this.bookedSeats$$.value, response]);
            this.cartService.removeFromCart(ticket.id, ticket.userID);
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
