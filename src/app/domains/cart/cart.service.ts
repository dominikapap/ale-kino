import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
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

export type TD2 = Partial<{
  ticketTypeName: string;
  ticketPrice: number;
  rowSeat: string;
  columnSeat: number;
  userID: number;
  showingId: number;
  id: string;
}>;

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);
  private cart$$ = new BehaviorSubject<TD2[]>([]);

  get cart$() {
    return this.cart$$.asObservable();
  }

  get cartValue() {
    return this.cart$$.value;
  }
  get cartPrices$(): Observable<(number | undefined)[]> {
    return this.cart$.pipe(map((item) => item.map((res) => res.ticketPrice)));
  }

  addToCart(ticketList: TD2[], userID: number) {
    // eslint-disable-next-line prefer-const

    if (userID) {
      return ticketList.forEach((element) => {
        this.http
          .post<TicketDetails>(`http://localhost:3000/cart`, {
            ticketTypeName: element.ticketTypeName,
            ticketPrice: element.ticketPrice,
            rowSeat: element.rowSeat,
            columnSeat: element.columnSeat,
            userID: element.userID,
            showingId: element.showingId,
            id: createUuidv4(),
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
        });
      });

      localStorage.setItem('guestTickets', JSON.stringify(guestTickets));
      this.cart$$.next([...this.cart$$.value, ...guestTickets]);
      console.log(this.cart$$.value);
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
        .get<TicketDetails[]>(`http://localhost:3000/cart?userId=${userID}`)
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
        .delete<TicketDetails[]>(`http://localhost:3000/cart/${ticketId}`)
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
}
