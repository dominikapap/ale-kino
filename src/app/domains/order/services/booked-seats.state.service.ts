import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { UserStateService } from 'src/app/core/user.state.service';
import { CartStateService, TD2 } from '../cart/cart.state.service';
import { v4 as createUuidv4 } from 'uuid';

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
  private userService = inject(UserStateService);
  private bookedSeats$$ = new BehaviorSubject<BookedSeat[]>([]);

  get bookedSeats$() {
    return this.bookedSeats$$.asObservable();
  }

  getBookedSeats(showingId: number) {
    this.http
      .get<BookedSeat[]>(`/bookedSeats?showingID=${showingId}`)
      .pipe(
        tap({
          next: (seatsList) => {
            this.bookedSeats$$.next([...seatsList]);
          },
        })
      )
      .subscribe();
  }
  bookSeat(ticket: TD2, orderID: string, date: string) {
    this.http
      .post<BookedSeat>('/bookedSeats', {
        rowSeat: ticket.rowSeat,
        columnSeat: ticket.columnSeat,
        ticketTypeName: ticket.ticketTypeName,
        ticketPrice: ticket.ticketPrice,
        showingID: ticket.showingId,
        userID: this.userService.getUserID(),
        orderID,
        date,
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
