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

export interface TicketInCartDetails extends TicketDetails {
  inCart: boolean;
  timestamp: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartStateService {
  private http = inject(HttpClient);
  private cart$$ = new BehaviorSubject<TicketInCartDetails[]>([]);

  get cart$() {
    return this.cart$$.asObservable();
  }

  get cartValue() {
    return this.cart$$.value;
  }

  get cartPrices$(): Observable<number> {
    return this.cart$.pipe(
      map((cart) =>
        cart.reduce((accTotal, cartItem) => accTotal + cartItem.ticketPrice, 0)
      )
    );
  }

  addToCart(ticketList: TicketDetails[], userID: number) {
    const timestamp = new Date().toISOString();
    if (userID) {
      this.addToCartAsUser(ticketList, timestamp);
    } else {
      this.addToCartAsGuest(ticketList, timestamp);
    }
  }

  getCart(userID: number) {
    const now = new Date();
    now.setMinutes(now.getMinutes() - 15);

    const guestTickets = localStorage.getItem('guestTickets');

    if (guestTickets) {
      this.getTicketsFromLS(guestTickets, now);
    }

    if (userID) {
      return this.http
        .get<TicketInCartDetails[]>(
          `/cart?userId=${userID}&timestamp_gte=${now.toISOString()}`
        )
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

  removeFromCart(ticketID: number | string, userID: number) {
    if (userID > 0) {
      return this.http
        .delete<TicketDetails[]>(`/cart/${ticketID}`)
        .pipe(
          tap({
            next: () => {
              this.cart$$.next(
                this.cart$$.value.filter((item) => item.id !== ticketID)
              );
            },
          })
        )
        .subscribe();
    } else {
      this.cart$$.next(
        this.cart$$.value.filter((item) => item.id !== ticketID)
      );
      localStorage.setItem(
        'guestTickets',
        JSON.stringify(this.cart$$.value.filter((item) => item.userID < 0)) //remove tickets added with a role User
      );
      return;
    }
  }

  emptyCart() {
    return this.cart$$.next([]);
  }

  updateTicket(
    ticketID: string,
    ticketTypeName: string,
    ticketPrice: number,
    userID: number
  ) {
    if (userID > 0) {
      this.http
        .patch(`/cart/${ticketID}`, {
          ticketTypeName,
          ticketPrice,
        })
        .pipe(
          tap({
            next: () => {
              const ticketIndex = this.getTicketIndexinCart(ticketID);
              if (ticketIndex !== -1) {
                this.updateTypeAndPrice(
                  ticketIndex,
                  ticketPrice,
                  ticketTypeName
                );
              }
            },
          })
        )
        .subscribe();
    } else {
      const ticketIndex = this.getTicketIndexinCart(ticketID);
      if (ticketIndex !== -1) {
        this.updateTypeAndPrice(ticketIndex, ticketPrice, ticketTypeName);
        localStorage.setItem('guestTickets', JSON.stringify(this.cart$$.value));
      }
    }
  }

  private addToCartAsUser(ticketList: TicketDetails[], timestamp: string) {
    return ticketList.forEach((ticket) => {
      if (this.cart$$.value.find((item) => item.id === ticket.id)) {
        return;
      } else {
        this.http
          .post<TicketInCartDetails>(`/cart`, {
            ticketTypeName: ticket.ticketTypeName,
            ticketPrice: ticket.ticketPrice,
            rowSeat: ticket.rowSeat,
            columnSeat: ticket.columnSeat,
            userID: ticket.userID,
            showingId: ticket.showingId,
            id: createUuidv4(),
            inCart: true,
            timestamp,
          })
          .pipe(
            tap({
              next: (response) => {
                this.cart$$.next([...this.cart$$.value, response]);
              },
            })
          )
          .subscribe();
      }
    });
  }

  private addToCartAsGuest(ticketList: TicketDetails[], timestamp: string) {
    const guestTickets: TicketInCartDetails[] = [];
    ticketList.forEach((ticket) => {
      guestTickets.push({
        ticketTypeName: ticket.ticketTypeName,
        ticketPrice: ticket.ticketPrice,
        rowSeat: ticket.rowSeat,
        columnSeat: ticket.columnSeat,
        userID: -1,
        showingId: ticket.showingId,
        id: createUuidv4(),
        inCart: true,
        timestamp: timestamp,
      });
    });

    localStorage.setItem('guestTickets', JSON.stringify(guestTickets));
    this.cart$$.next([...this.cart$$.value, ...guestTickets]);
    return;
  }

  private getTicketsFromLS(guestTickets: string, now: Date) {
    this.cart$$.next(JSON.parse(guestTickets));
    this.cart$$.next(
      this.cart$$.value.filter(
        (cartItem) => cartItem.timestamp > now.toISOString()
      )
    );
  }

  private getTicketIndexinCart(ticketID: string) {
    return this.cart$$.value.findIndex((ticket) => ticket.id === ticketID);
  }

  private updateTypeAndPrice(
    ticketIndex: number,
    ticketPrice: number,
    ticketTypeName: string
  ) {
    this.cart$$.value[ticketIndex].ticketPrice = ticketPrice;
    this.cart$$.value[ticketIndex].ticketTypeName = ticketTypeName;
  }
}
