import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainNavbarComponent } from './shell/main-navbar/main-navbar.component';
import { MainFooterComponent } from './shell/main-footer/main-footer.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { ShowingsComponent } from './domains/movies/showings/showings.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { ShellComponent } from './shell/shell.component';
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
import MovieDetailsComponent from './domains/movies/movie-details/movie-details.component';
import { ThisWeekComponent } from './domains/movies/this-week/this-week.component';
import ShowingDetailsComponent from './domains/order/showing-details/showing-details.component';
import { SeatGridComponent } from './domains/order/tickets/seat-grid/seat-grid.component';
import { TicketsComponent } from './domains/order/tickets/tickets.component';
import { WatchListComponent } from './domains/user/watch-list';
import OrderSummaryComponent from './domains/order/order-summary/order-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavbarComponent,
    MainFooterComponent,
    WatchListComponent,
    PageNotFoundComponent,
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
    MatButtonToggleModule,
  ],
  providers: [
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
