import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieDetails } from 'src/app/interfaces/MovieDetails';
import { MovieApiService } from 'src/app/services/movieapi.service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
  imports: [CommonModule],
})
export default class MovieDetailsComponent {
  @Input() movieId = 0;

  private showingService = inject(MovieApiService);
  movieDetails!: Observable<MovieDetails>;

  ngOnInit() {
    this.movieDetails = this.showingService.getMovieDetails(this.movieId);
  }
}
