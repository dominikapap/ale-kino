import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserTicketsStateService } from './user-tickets.state.service';

@Component({
  selector: 'app-user-tickets',
  standalone: true,
  templateUrl: './user-tickets.component.html',
  styleUrls: [],
  imports: [AsyncPipe, NgIf, JsonPipe, NgFor, RouterModule],
})
export default class UserTicketsComponent implements OnInit {
  private userTicketsStateService = inject(UserTicketsStateService);
  userTickets$ = this.userTicketsStateService.userTickets$;
  ngOnInit() {
    this.userTicketsStateService.getUserTickets();
  }
}
