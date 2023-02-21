import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { v4 as createUuidv4 } from 'uuid';
import { TicketDetails, TicketInCartDetails } from './cart.state.service';

@Injectable({
  providedIn: 'root',
})
export class CartApiService {
  private http = inject(HttpClient);

  getCartItems(now: string, userID: number) {
    return this.http.get<TicketInCartDetails[]>(
      `/cart?userId=${userID}&timestamp_gte=${now}`
    );
  }

  patchTicketvalue(
    ticketID: string,
    ticketTypeName: string,
    ticketPrice: number
  ) {
    return this.http.patch(`/cart/${ticketID}`, {
      ticketTypeName,
      ticketPrice,
    });
  }

  postCartItems(
    ticket: TicketDetails,
    timestamp: string
  ): Observable<TicketInCartDetails> {
    return this.http.post<TicketInCartDetails>(`/cart`, {
      ticketTypeName: ticket.ticketTypeName,
      ticketPrice: ticket.ticketPrice,
      rowSeat: ticket.rowSeat,
      columnSeat: ticket.columnSeat,
      userID: ticket.userID,
      showingId: ticket.showingId,
      id: createUuidv4(),
      inCart: true,
      timestamp,
    });
  }

  deleteCartItems(ticketID: string) {
    return this.http.delete<TicketDetails[]>(`/cart/${ticketID}`);
  }
}
