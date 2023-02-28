import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
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
  selector: 'app-movie-details[movieId]',
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
export default class MovieDetailsComponent implements OnInit {
  @Input() movieId = '';
  @Input() movieShowings: ShowingInMovieDetails[] = [];

  private showingService = inject(MovieDetailsService);
  private watchlistStateService = inject(WatchListStateService);
  private router = inject(Router);
  auth$ = inject(AuthStateService).auth$;
  movieDetails!: Observable<MovieDetails>;
  showMore = false;

  ngOnInit() {
    this.movieDetails = this.showingService.getMovieDetails(this.movieId);
  }

  onWatchlist(movieTitle: string): boolean {
    return this.watchlistStateService.checkIfOnWatchlist(movieTitle);
  }
  onUpdateWatchlist(movieTitle: string, movieID: string) {
    this.watchlistStateService.addToWatchlist(movieTitle, movieID);
  }
  navigateToWatchlist() {
    this.router.navigate(['watchlist']);
  }
}
