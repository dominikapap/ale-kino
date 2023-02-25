import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { ShellComponent } from './shell/shell/shell.component';
import SumPipe from './shared/pipes/sum.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CustomHttpInterceptor } from './core/custom-http.interceptor';
import { environment } from 'src/environments/environment';
import { API_URL, IS_PRODUCTION } from './core/env.token';
import ShowingDetailsComponent from './domains/order/showing-details/showing-details.component';
import { WatchListComponent } from './domains/user';
import { ShowingsComponent, ThisWeekComponent } from './domains/movies';
import MovieDetailsComponent from './domains/movies/movie-details/movie-details.component';
import { TicketsComponent, SeatGridComponent } from './domains/order';
import { MainFooterComponent, MainNavbarComponent } from './shell';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    MainNavbarComponent,
    MainFooterComponent,
    WatchListComponent,
    ShowingsComponent,
    ThisWeekComponent,
    TicketsComponent,
    ShellComponent,
    SeatGridComponent,
  ],
  imports: [
    ShowingDetailsComponent,
    SumPipe,
    MovieDetailsComponent,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatDialogModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ],
  providers: [
    MatSnackBarModule,
    {
      provide: API_URL,
      useValue: environment.API_URL,
    },
    {
      provide: IS_PRODUCTION,
      useValue: environment.production,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
