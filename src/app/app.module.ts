import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainNavbarComponent } from './main-navbar/main-navbar.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { MoviesDetailsComponent } from './movies-details/movies-details.component';
import { DaysComponent } from './days/days.component';
import { WatchListComponent } from './watch-list/watch-list.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShowingsComponent } from './showings/showings.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './checkout/checkout.component';
import { ThisWeekComponent } from './this-week/this-week.component';
import { TicketsComponent } from './tickets/tickets.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavbarComponent,
    MainFooterComponent,
    MoviesDetailsComponent,
    DaysComponent,
    WatchListComponent,
    LoginComponent,
    PageNotFoundComponent,
    ShowingsComponent,
    CheckoutComponent,
    ThisWeekComponent,
    TicketsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
