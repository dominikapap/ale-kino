import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { RouterModule } from '@angular/router';
import { AddToRepertoireComponent } from './add-to-repertoire.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AddToRepertoireComponent,
    AddToRepertoireComponent,
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
        path: 'add-to-repertoire',
        component: AddToRepertoireComponent,
      },
    ]),
  ],
  providers: [MatDatepickerModule, MatNativeDateModule],
})
export default class AdminModule {}
