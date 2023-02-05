import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieShowing } from 'src/app/interfaces/MovieShowing';
import { MovieApiService } from 'src/app/services/movieapi.service';
import { ShowingDetailsService } from './showing-details.service';

@Component({
  selector: 'app-showing-details',
  standalone: true,
  templateUrl: './showing-details.component.html',
  styleUrls: ['./showing-details.component.css'],
  imports: [NgIf, AsyncPipe],
})
export default class ShowingDetailsComponent {
  @Input() showingId = 0;

  private showingService = inject(ShowingDetailsService);
  showingDetails!: Observable<MovieShowing>;

  ngOnInit() {
    this.showingDetails = this.showingService.getShowingDetails(this.showingId);
  }
}
