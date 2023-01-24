import { Component, inject, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieDetails } from 'src/app/interfaces/MovieDetails';
import { MovieShowing } from 'src/app/interfaces/MovieShowing';
import { MovieApiService } from 'src/app/services/movieapi.service';

@Component({
  selector: 'app-showing-details',
  templateUrl: './showing-details.component.html',
  styleUrls: ['./showing-details.component.css'],
})
export class ShowingDetailsComponent {
  @Input() showingId = 0;

  private showingService = inject(MovieApiService);
  showingDetails!: Observable<MovieShowing>;

  ngOnInit() {
    this.showingDetails = this.showingService.getShowingDetails(this.showingId);
  }
}
