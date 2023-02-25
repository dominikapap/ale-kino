import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserStateService } from 'src/app/auth/user.state.service';
import { TicketInCartDetails } from '../cart/cart.state.service';

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
export class BookedSeatsApiService {
  private http = inject(HttpClient);
  private userService = inject(UserStateService);

  get(showingId: number) {
    return this.http.get<BookedSeat[]>(`/bookedSeats?showingID=${showingId}`);
  }
  bookSeat(ticket: TicketInCartDetails, orderID: string, date: string) {
    return this.http.post<BookedSeat>('/bookedSeats', {
      rowSeat: ticket.rowSeat,
      columnSeat: ticket.columnSeat,
      ticketTypeName: ticket.ticketTypeName,
      ticketPrice: ticket.ticketPrice,
      showingID: ticket.showingId,
      userID: this.userService.getUserID(),
      orderID,
      date,
    });
  }
}
