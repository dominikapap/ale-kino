import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import SettingsComponent from '../domains/user/settings/settings.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AdminDashboardComponent],
  imports: [
    CommonModule,
    SettingsComponent,
    MatIconModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminDashboardComponent,
      },
      { path: 'settings', component: SettingsComponent },
      {
        path: 'showings',
        loadChildren: () => import('./showings/showings.module'),
      },
      {
        path: 'movies',
        loadChildren: () => import('./movies/movies.module'),
      },
    ]),
  ],
  providers: [MatSnackBar],
})
export default class AdminModule {}
