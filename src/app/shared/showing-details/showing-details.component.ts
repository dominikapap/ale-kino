import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieShowing } from 'src/app/interfaces/MovieShowing';
import { MovieApiService } from 'src/app/services/movieapi.service';
import MovieDetailsComponent from '../movie-details/movie-details.component';

@Component({
  selector: 'app-showing-details',
  standalone: true,
  templateUrl: './showing-details.component.html',
  styleUrls: ['./showing-details.component.css'],
  imports: [MovieDetailsComponent, CommonModule],
})
export default class ShowingDetailsComponent {
  @Input() showingId = 0;

  private showingService = inject(MovieApiService);
  showingDetails!: Observable<MovieShowing>;

  ngOnInit() {
    this.showingDetails = this.showingService.getShowingDetails(this.showingId);
  }
}
