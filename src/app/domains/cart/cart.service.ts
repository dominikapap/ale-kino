import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
interface Ticket {
  ticketTypeName?: string | undefined;
  ticketPrice?: number;
  rowSeat?: string;
  columnSeat?: number;
}

interface Ticket2 {
  ticketTypeName?: string | undefined;
  ticketPrice?: number;
  rowSeat?: string;
  columnSeat?: number;
  userID: number;
  showingId: number;
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);
  private cart$$ = new BehaviorSubject<Ticket2[]>([]);

  get cart$() {
    return this.cart$$.asObservable();
  }
  get cartPrices$() {
    return this.cart$.pipe(map((item) => item.map((res) => res.ticketPrice)));
  }

  addToCart(ticketList: Ticket[], userID: number, showingId: number) {
    ticketList.forEach((element) => {
      this.http
        .post<Ticket2[]>(`http://localhost:3000/cart`, {
          ticketTypeName: element.ticketTypeName,
          ticketPrice: element.ticketPrice,
          rowSeat: element.rowSeat,
          columnSeat: element.columnSeat,
          userID: userID,
          showingId: showingId,
        })
        .pipe(
          tap({
            next: (response) =>
              this.cart$$.next([...this.cart$$.value, response[0]]),
          })
        )
        .subscribe();
    });
  }

  getCart(userID: number) {
    this.http
      .get<Ticket2[]>(`http://localhost:3000/cart?userId=${userID}`)
      .pipe(
        tap({
          next: (result) => {
            this.cart$$.next(result);
          },
        })
      )
      .subscribe();
  }

  removeFromCart(ticketId: number) {
    this.http
      .delete<Ticket2[]>(`http://localhost:3000/cart/${ticketId}`)
      .pipe(
        tap({
          next: () => {
            this.cart$$.next(
              this.cart$$.value.filter((item) => item.id !== ticketId)
            );
          },
        })
      )
      .subscribe();
  }

  emptyCart() {
    return this.cart$$.next([]);
  }
}
