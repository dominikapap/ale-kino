import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ShowingsListComponent } from './showings/showings-list.component';
import { MoviesListComponent } from './movies/movies-list.component';
import { StoreModule } from '@ngrx/store';
import { showingsReducer } from './showings/store/showings.reducer';
import { showingsFeatureKey } from './showings/store/showings.state';
import { AddMovieComponent } from './movies/addMovie/add-movie.component';
import { AddShowingComponent } from './showings/addShowings/add-showing.component';
import { moviesFeatureKey } from './movies/store/movies.state';
import { moviesReducer } from './movies/store/movies.reducer';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    ShowingsListComponent,
    MoviesListComponent,
    AddMovieComponent,
    AddShowingComponent,
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
    StoreModule.forFeature(showingsFeatureKey, showingsReducer),
    StoreModule.forFeature(moviesFeatureKey, moviesReducer),
    RouterModule.forChild([
      {
        path: '',
        component: AdminDashboardComponent,
      },
      {
        path: 'showings/add-showing',
        component: AddShowingComponent,
      },
      {
        path: 'showings/showings-list',
        component: ShowingsListComponent,
      },
      {
        path: 'movies/add-movie',
        component: AddMovieComponent,
      },
      {
        path: 'movies/movies-list',
        component: MoviesListComponent,
      },
    ]),
  ],
  providers: [MatDatepickerModule, MatNativeDateModule],
})
export default class AdminModule {}
