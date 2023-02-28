import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketsComponent } from './tickets.component';
import { SeatGridComponent } from './seat-grid/seat-grid.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import ShowingDetailsComponent from '../showing-details/showing-details.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [TicketsComponent, SeatGridComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    ShowingDetailsComponent,
    MatProgressSpinnerModule,
    RouterModule.forChild([
      {
        path: '',
        component: TicketsComponent,
      },
    ]),
  ],
})
export default class TicketsModule {}
