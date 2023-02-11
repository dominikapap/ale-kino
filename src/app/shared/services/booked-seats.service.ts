import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { UserStateService } from 'src/app/core/user.state.service';
import { CartService, TD2 } from '../../domains/cart/cart.service';
import { ReservedSeatsService } from '../../domains/tickets/reserved-seats.service';

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
  private userService = inject(UserStateService);
  private bookedSeats$$ = new BehaviorSubject<BookedSeat[]>([]);

  get reservedSeats$() {
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
  bookSeat(ticket: TD2) {
    this.http
      .post<BookedSeat>('/bookedSeats', {
        rowSeat: ticket.rowSeat,
        columnSeat: ticket.columnSeat,
        ticketTypeName: ticket.ticketTypeName,
        ticketPrice: ticket.ticketPrice,
        showingID: ticket.showingId,
        userID: this.userService.getUserID(),
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
