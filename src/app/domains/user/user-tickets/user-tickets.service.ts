import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { BookedSeat } from '../../order/services/booked-seats.state.service';

interface Tickets {
  rowSeat: string;
  columnSeat: number;
  ticketTypeName: string;
  ticketPrice: number;
  showingID: number;
  userID: number;
  id: number;
}

export interface TransformedOrder {
  orderID: string;
  date: string;
  tickets: Tickets[];
}

@Injectable({
  providedIn: 'root',
})
export class UserTicketsService {
  private http = inject(HttpClient);

  getUserOrders(userID: number): Observable<TransformedOrder[]> {
    return this.http
      .get<BookedSeat[]>(`/bookedSeats?userID=${userID}`)
      .pipe(map((response) => (response = this.transformOrders(response))));
  }
  getOrderById(orderID: string): Observable<TransformedOrder[]> {
    return this.http
      .get<BookedSeat[]>(`/bookedSeats?orderID=${orderID}`)
      .pipe(map((response) => (response = this.transformOrders(response))));
  }

  transformOrders(list: any[]) {
    return list.reduce((acc, current) => {
      const existingOrder = acc.find(
        (order: any) => order.orderID === current.orderID
      );
      if (existingOrder) {
        (existingOrder.date = current.date),
          existingOrder.tickets.push({
            rowSeat: current.rowSeat,
            columnSeat: current.columnSeat,
            ticketTypeName: current.ticketTypeName,
            ticketPrice: current.ticketPrice,
            showingID: current.showingID,
            userID: current.userID,
            id: current.id,
          });
      } else {
        acc.push({
          orderID: current.orderID,
          date: current.date,
          tickets: [
            {
              rowSeat: current.rowSeat,
              columnSeat: current.columnSeat,
              ticketTypeName: current.ticketTypeName,
              ticketPrice: current.ticketPrice,
              showingID: current.showingID,
              userID: current.userID,
              id: current.id,
            },
          ],
        });
      }
      return acc;
    }, []);
  }
}
