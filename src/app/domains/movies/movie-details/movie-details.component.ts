import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStateService } from 'src/app/auth';
import { WatchListService } from '../../user';
import { MovieRatingComponent } from '../movie-rating/movie-rating.component';
import { MovieDetailsService } from './movie-details.service';
import { MovieDetails } from './MovieDetails.interface';

@Component({
  selector: 'app-movie-details[movieId]',
  standalone: true,
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  imports: [CommonModule, MovieRatingComponent, MatButtonModule],
  providers: [MovieDetailsService],
})
export default class MovieDetailsComponent {
  @Input() movieId = 0;

  private showingService = inject(MovieDetailsService);
  private watchlistService = inject(WatchListService);
  private router = inject(Router);
  auth$ = inject(AuthStateService).auth$;
  movieDetails!: Observable<MovieDetails>;
  showMore = false;

  ngOnInit() {
    this.movieDetails = this.showingService.getMovieDetails(this.movieId);
  }

  onWatchlist(movieTitle: string): boolean {
    return this.watchlistService.checkIfOnWatchlist(movieTitle);
  }
  onUpdateWatchlist(movieTitle: string, movieID: number) {
    this.watchlistService.addToWatchlist(movieTitle, movieID);
  }
  navigateToWatchlist() {
    this.router.navigate(['watchlist']);
  }
}
