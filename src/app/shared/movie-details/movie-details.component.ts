import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStateService } from 'src/app/auth';
import { MovieRatingComponent } from 'src/app/domains/movie-rating/movie-rating.component';
import { WatchListService } from 'src/app/domains/watch-list';
import { MovieDetails } from 'src/app/shared/interfaces/MovieDetails';
import { MovieApiService } from 'src/app/shared/services/movieapi.service';

@Component({
  selector: 'app-movie-details[movieId]',
  standalone: true,
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
  imports: [CommonModule, MovieRatingComponent, MatButtonModule],
})
export default class MovieDetailsComponent {
  @Input() movieId = 0;

  private showingService = inject(MovieApiService);
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
    this.router.navigate(['do-obejrzenia']);
  }
}
