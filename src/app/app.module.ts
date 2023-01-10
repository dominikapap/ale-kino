import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainNavbarComponent } from './domains/main-navbar/main-navbar.component';
import { MainFooterComponent } from './domains/main-footer/main-footer.component';
import { MoviesDetailsComponent } from './domains/movies-details/movies-details.component';
import { WatchListComponent } from './domains/watch-list/watch-list.component';
import { LoginComponent } from './auth/login.component';
import { PageNotFoundComponent } from './domains/page-not-found/page-not-found.component';
import { ShowingsComponent } from './domains/showings/showings.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './domains/checkout/checkout.component';
import { ThisWeekComponent } from './shared/this-week/this-week.component';
import { TicketsComponent } from './domains/tickets/tickets.component';
import { MovieRatingComponent } from './domains/movie-rating/movie-rating.component';
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
