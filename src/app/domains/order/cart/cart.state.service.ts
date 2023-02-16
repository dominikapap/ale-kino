import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, reduce, tap } from 'rxjs';
import { v4 as createUuidv4 } from 'uuid';

export interface TicketDetails {
  ticketTypeName: string;
  ticketPrice: number;
  rowSeat: string;
  columnSeat: number;
  userID: number;
  showingId: number;
  id: string;
}

export type TD2 = {
  ticketTypeName: string;
  ticketPrice: number;
  rowSeat: string;
  columnSeat: number;
  userID: number;
  showingId: number;
  id: string;
  inCart: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class CartStateService {
  private http = inject(HttpClient);
  private cart$$ = new BehaviorSubject<TD2[]>([]);

  get cart$() {
    return this.cart$$.asObservable();
  }

  get cartValue() {
    return this.cart$$.value;
  }

  //  map(cart => cart.reduce((accumalatedTotal, cartItem) =>
  //     accumalatedTotal + (cartItem.price * cartItem.quantity), 0)
  //   )

  get cartPrices$(): Observable<number> {
    return this.cart$.pipe(
      map((cart) =>
        cart.reduce((accTotal, cartItem) => accTotal + cartItem.ticketPrice, 0)
      )
    );
  }

  addToCart(ticketList: TD2[], userID: number) {
    // eslint-disable-next-line prefer-const

    if (userID) {
      return ticketList.forEach((element) => {
        this.http
          .post<TD2>(`/cart`, {
            ticketTypeName: element.ticketTypeName,
            ticketPrice: element.ticketPrice,
            rowSeat: element.rowSeat,
            columnSeat: element.columnSeat,
            userID: element.userID,
            showingId: element.showingId,
            id: createUuidv4(),
            inCart: true,
          })
          .pipe(
            tap({
              next: (response) => {
                this.cart$$.next([...this.cart$$.value, response]);
              },
            })
          )
          .subscribe();
      });
    } else {
      const guestTickets: TD2[] = [];
      ticketList.forEach((element) => {
        guestTickets.push({
          ticketTypeName: element.ticketTypeName,
          ticketPrice: element.ticketPrice,
          rowSeat: element.rowSeat,
          columnSeat: element.columnSeat,
          userID: -1,
          showingId: element.showingId,
          id: createUuidv4(),
          inCart: element.inCart,
        });
      });

      localStorage.setItem('guestTickets', JSON.stringify(guestTickets));
      this.cart$$.next([...this.cart$$.value, ...guestTickets]);
      return;
    }
  }

  getCart(userID: number) {
    this.cart$$.next([]);
    const guestTickets = localStorage.getItem('guestTickets');
    if (guestTickets) {
      this.cart$$.next(JSON.parse(guestTickets));
    }

    if (userID) {
      return this.http
        .get<TD2[]>(`/cart?userId=${userID}`)
        .pipe(
          tap({
            next: (result) => {
              this.cart$$.next([...this.cart$$.value, ...result]);
            },
          })
        )
        .subscribe();
    }

    return;
  }

  removeFromCart(ticketId: number | string, userID: number) {
    if (userID) {
      return this.http
        .delete<TicketDetails[]>(`/cart/${ticketId}`)
        .pipe(
          tap({
            next: () => {
              this.cart$$.next(
                this.cart$$.value.filter((item) => item.id !== ticketId)
              );
            },
            error: () => {
              this.cart$$.next(
                this.cart$$.value.filter((item) => item.id !== ticketId)
              );
              localStorage.setItem(
                'guestTickets',
                JSON.stringify(this.cart$$.value)
              );
            },
          })
        )
        .subscribe();
    } else {
      this.cart$$.next(
        this.cart$$.value.filter((item) => item.id !== ticketId)
      );
      localStorage.setItem('guestTickets', JSON.stringify(this.cart$$.value));
      return;
    }
  }

  emptyCart() {
    return this.cart$$.next([]);
  }

  applyCoupon() {
    return 0.8;
  }
}
