import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { RouterModule } from '@angular/router';
import { AddToRepertoireComponent } from './addShowings/add-to-repertoire.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ShowingsListComponent } from './showings/showings-list.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AddToRepertoireComponent,
    AddToRepertoireComponent,
    ShowingsListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminDashboardComponent,
      },
      {
        path: 'showings/add-to-repertoire',
        component: AddToRepertoireComponent,
      },
      {
        path: 'showings/showings-list',
        component: ShowingsListComponent,
      },
    ]),
  ],
  providers: [MatDatepickerModule, MatNativeDateModule],
})
export default class AdminModule {}
