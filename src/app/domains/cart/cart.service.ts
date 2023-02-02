import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { v4 as createUuidv4 } from 'uuid';

interface Ticket {
  ticketTypeName?: string | undefined;
  ticketPrice?: number;
  rowSeat?: string;
  columnSeat?: number;
}

interface TicketDetails extends Ticket {
  userID?: number;
  showingId: number;
  id: number | string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);
  private cart$$ = new BehaviorSubject<TicketDetails[]>([]);

  get cart$() {
    return this.cart$$.asObservable();
  }
  get cartPrices$(): Observable<(number | undefined)[]> {
    return this.cart$.pipe(map((item) => item.map((res) => res.ticketPrice)));
  }

  addToCart(ticketList: Ticket[], userID: number, showingId: number) {
    if (userID) {
      ticketList.forEach((element) => {
        this.http
          .post<TicketDetails[]>(`http://localhost:3000/cart`, {
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
    } else {
      let guestTickets: TicketDetails[] = [];
      if (localStorage.getItem('guestTickets') !== '') {
        const guestTicketsFromLS = localStorage.getItem('guestTickets');
        guestTickets = JSON.parse(guestTicketsFromLS!);
      }
      ticketList.forEach((element) => {
        guestTickets.push({
          ticketTypeName: element.ticketTypeName,
          ticketPrice: element.ticketPrice,
          rowSeat: element.rowSeat,
          columnSeat: element.columnSeat,
          showingId: showingId,
          id: createUuidv4(),
        });
      });

      localStorage.setItem('guestTickets', JSON.stringify(guestTickets));
      this.cart$$.next([...this.cart$$.value, ...guestTickets]);
    }
  }

  getCart(userID: number) {
    if (userID) {
      this.http
        .get<TicketDetails[]>(`http://localhost:3000/cart?userId=${userID}`)
        .pipe(
          tap({
            next: (result) => {
              this.cart$$.next([...this.cart$$.value, ...result]);
            },
          })
        )
        .subscribe();
    } else {
      const guestTickets = localStorage.getItem('guestTickets');
      if (guestTickets) {
        this.cart$$.next(JSON.parse(guestTickets));
      }
    }
  }

  removeFromCart(ticketId: number | string, userID: number) {
    if (userID) {
      console.log('remove for logged user');
      this.http
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
    }
  }

  emptyCart() {
    return this.cart$$.next([]);
  }
}
