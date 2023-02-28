import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
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
      <h2 class="user-tickets-container__order-num text-2xl font-semibold">
        <span> Zamówienie nr:</span> {{ order[0].orderID }}<span> z dnia</span>
        {{ order[0].date }}
      </h2>

      <ol>
        <li
          *ngFor="let ticket of order[0].tickets"
          class="user-tickets-container__tickets text-lg mt-2"
        >
          {{ ticket.ticketTypeName }}, cena: {{ ticket.ticketPrice }}, miejsce
          {{ ticket.rowSeat }}{{ ticket.columnSeat }}<br />
          <app-showing-details
            class="inline"
            [showingId]="ticket.showingID"
          ></app-showing-details>
        </li>
      </ol>
    </ng-container>
  `,
  styles: [
    `
      h2 span,
      app-showing-details {
        color: rgb(14, 116, 144);
      }
    `,
  ],
  imports: [NgIf, AsyncPipe, NgFor, ShowingDetailsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrderSummaryComponent implements OnInit {
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
