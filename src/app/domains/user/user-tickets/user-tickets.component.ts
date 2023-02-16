import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { UserStateService } from 'src/app/core/user.state.service';
import ShowingDetailsComponent from '../../order/showing-details/showing-details.component';
import { UserTicketsService } from './user-tickets.service';

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
  userTickets$ = this.userTicketsService.getUserOrders(this.userID);
}
