import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { AuthStateService } from 'src/app/auth';
import { WatchListStateService } from '../../user';
import { MovieRatingComponent } from '../movie-rating/movie-rating.component';
import { MovieDetailsService } from './movie-details.service';

import { MovieDetails } from './MovieDetails.interface';
interface ShowingInMovieDetails {
  showingId: number;
  timeFrom: string;
  date: string;
}

@Component({
  selector: 'app-movie-details[movieDetails]',
  standalone: true,
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  imports: [
    CommonModule,
    MovieRatingComponent,
    MatButtonModule,
    RouterLink,
    MatProgressSpinnerModule,
  ],
  providers: [MovieDetailsService],
})
export default class MovieDetailsComponent {
  @Input() movieShowings: ShowingInMovieDetails[] = [];
  @Input() movieDetails!: MovieDetails | undefined;

  private watchlistStateService = inject(WatchListStateService);
  auth$ = inject(AuthStateService).auth$;
  showMore = false;

  onWatchlist(movieTitle: string): boolean {
    return this.watchlistStateService.checkIfOnWatchlist(movieTitle);
  }
  onUpdateWatchlist(movieTitle: string, movieID: string) {
    this.watchlistStateService.addToWatchlist(movieTitle, movieID);
  }
}
