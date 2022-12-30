import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainNavbarComponent } from './main-navbar/main-navbar.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { MoviesDetailsComponent } from './movies-details/movies-details.component';
import { WatchListComponent } from './watch-list/watch-list.component';
import { LoginComponent } from './auth/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShowingsComponent } from './showings/showings.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './checkout/checkout.component';
import { ThisWeekComponent } from './this-week/this-week.component';
import { TicketsComponent } from './tickets/tickets.component';
import { MovieRatingComponent } from './movie-rating/movie-rating.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,
    MainNavbarComponent,
    MainFooterComponent,
    MoviesDetailsComponent,
    WatchListComponent,
    LoginComponent,
    PageNotFoundComponent,
    ShowingsComponent,
    CheckoutComponent,
    ThisWeekComponent,
    TicketsComponent,
    MovieRatingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatRadioModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
