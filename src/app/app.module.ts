import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainNavbarComponent } from './domains/main-navbar/main-navbar.component';
import { MainFooterComponent } from './domains/main-footer/main-footer.component';
import { WatchListComponent } from './domains/watch-list/watch-list.component';
import { PageNotFoundComponent } from './domains/page-not-found/page-not-found.component';
import { ShowingsComponent } from './domains/showings/showings.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ThisWeekComponent } from './shared/this-week/this-week.component';
import { TicketsComponent } from './domains/tickets/tickets.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { ShellComponent } from './shell/shell.component';
import ShowingDetailsComponent from './shared/showing-details/showing-details.component';
import MovieDetailsComponent from './shared/movie-details/movie-details.component';
import SumPipe from './shared/pipes/sum.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { SeatGridComponent } from './domains/tickets/seatGrid/seat-grid.component';
import { CustomHttpInterceptor } from './core/custom-http.interceptor';
import { environment } from 'src/environments/environment';
import { API_URL, IS_PRODUCTION } from './core/env.token';

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
