import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { User, UserStateService } from 'src/app/auth';
import {
  TransformedOrder,
  UserTicketsApiService,
} from './user-tickets.api.service';

@Injectable({
  providedIn: 'root',
})
export class UserTicketsStateService {
  private currentUserID$ = inject(UserStateService).user$;
  private userTicketsApiService = inject(UserTicketsApiService);
  private userTickets$$ = new BehaviorSubject<TransformedOrder[]>([]);

  get userTickets$() {
    return this.userTickets$$.asObservable();
  }

  getUserTickets() {
    this.currentUserID$
      .pipe(
        switchMap((user: User) =>
          this.userTicketsApiService.getUserOrders(user.userID)
        ),
        tap((result) => this.userTickets$$.next(result))
      )
      .subscribe();
  }
}
