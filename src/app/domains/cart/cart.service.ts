import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
interface Ticket {
  ticketTypeName?: string | undefined;
  ticketPrice?: number;
  rowSeat?: string;
  columnSeat?: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);
  private cart$$ = new BehaviorSubject<Ticket[]>([]);

  get cart$() {
    return this.cart$$.asObservable();
  }

  addToCart(ticketList: Ticket[], userID: number, showingId: number) {
    ticketList.forEach((element) => {
      this.http
        .post<Ticket[]>(`http://localhost:3000/cart`, {
          ticketTypeName: element.ticketTypeName,
          ticketPrice: element.ticketPrice,
          rowSeat: element.rowSeat,
          columnSeat: element.columnSeat,
          userID: userID,
          showingId: showingId,
        })
        .subscribe();
    });
  }
}
