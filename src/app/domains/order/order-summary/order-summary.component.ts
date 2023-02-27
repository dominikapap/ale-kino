import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {
  TransformedOrder,
  UserTicketsApiService,
} from '../../user/user-tickets/user-tickets.api.service';
import ShowingDetailsComponent from '../showing-details/showing-details.component';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  template: `
    <ng-container *ngIf="orderTickets$ | async as order">
      <h2 class="user-tickets-container__order-num">
        Zamówienie nr: {{ order[0].orderID }} z dnia {{ order[0].date }}
      </h2>

      <ul>
        <li
          *ngFor="let ticket of order[0].tickets"
          class="user-tickets-container__tickets"
        >
          <span>
            {{ ticket.ticketTypeName }}, cena: {{ ticket.ticketPrice }}, miejsce
            {{ ticket.rowSeat }}{{ ticket.columnSeat }}
            seans:

            <app-showing-details
              [showingId]="ticket.showingID"
            ></app-showing-details
          ></span>
        </li>
      </ul>
    </ng-container>
  `,
  styles: [],
  imports: [NgIf, AsyncPipe, NgFor, ShowingDetailsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrderSummaryComponent {
  private userTicketsService = inject(UserTicketsApiService);
  private routeParams = inject(ActivatedRoute).snapshot.paramMap;
  orderTickets$?: Observable<TransformedOrder[]>;

  ngOnInit() {
    const orderIdFromRoute = this.routeParams.get('id');
    this.orderTickets$ = this.userTicketsService.getOrderById(
      orderIdFromRoute!
    );
  }
}
