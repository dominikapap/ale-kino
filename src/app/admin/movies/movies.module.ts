import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { moviesFeatureKey } from './store/movies.state';
import { moviesReducer } from './store/movies.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(moviesFeatureKey, moviesReducer),
  ],
})
export default class MoviesModule {}
