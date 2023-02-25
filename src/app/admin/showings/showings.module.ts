import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddShowingComponent } from './addShowings/add-showing.component';
import { ShowingsListComponent } from './showings-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NumbersOnlyDirective } from 'src/app/shared';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ShowingsEffects } from './store/showings.effects';
import { showingsReducer } from './store/showings.reducer';
import { showingsFeatureKey } from './store/showings.state';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [ShowingsListComponent, AddShowingComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    NumbersOnlyDirective,
    MatNativeDateModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    StoreModule.forFeature(showingsFeatureKey, showingsReducer),
    EffectsModule.forFeature([ShowingsEffects]),
    RouterModule.forChild([
      { path: '', redirectTo: 'showings-list', pathMatch: 'full' },
      { path: 'add-showing', component: AddShowingComponent },
      {
        path: 'showings-list',
        component: ShowingsListComponent,
      },
    ]),
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBar,
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'pl-PL',
    },
  ],
})
export default class ShowingsModule {}
