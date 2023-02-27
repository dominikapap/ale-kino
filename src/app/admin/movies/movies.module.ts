import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { moviesFeatureKey } from './store/movies.state';
import { moviesReducer } from './store/movies.reducer';
import { RouterModule } from '@angular/router';
import { AddMovieComponent } from './addMovie/add-movie.component';
import { MoviesListComponent } from './movies-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NumbersOnlyDirective } from 'src/app/shared';
import { EffectsModule } from '@ngrx/effects';
import { MoviesEffects } from './store/movies.effects';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoEmptyCharsDirective } from 'src/app/shared/directives/noEmptyChars.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [MoviesListComponent, AddMovieComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    NumbersOnlyDirective,
    NoEmptyCharsDirective,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatIconModule,
    StoreModule.forFeature(moviesFeatureKey, moviesReducer),
    EffectsModule.forFeature([MoviesEffects]),
    RouterModule.forChild([
      { path: '', redirectTo: 'movies-list', pathMatch: 'full' },
      {
        path: 'add-movie',
        component: AddMovieComponent,
      },
      {
        path: 'movies-list',
        component: MoviesListComponent,
      },
    ]),
  ],
})
export default class MoviesModule {}
