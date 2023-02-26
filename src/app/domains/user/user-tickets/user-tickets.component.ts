import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { UserStateService } from 'src/app/auth/user.state.service';
import { TransformedOrder, UserTicketsService } from './user-tickets.service';

@Component({
  selector: 'app-user-tickets',
  standalone: true,
  templateUrl: './user-tickets.component.html',
  styleUrls: ['./user-tickets.component.scss'],
  imports: [AsyncPipe, NgIf, JsonPipe, NgFor, RouterModule],
})
export default class UserTicketsComponent {
  private userID = inject(UserStateService).getUserID();
  private userTicketsService = inject(UserTicketsService);
  userTickets$!: Observable<TransformedOrder[]>;
  ngOnInit() {
    this.userTickets$ = this.userTicketsService.getUserOrders();
  }
}
