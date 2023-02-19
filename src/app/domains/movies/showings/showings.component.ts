import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatesService } from '../services/dates.service';
import { ShowingsStateService } from './showings.state.service';

interface Showing {
  showingId: number;
  timeFrom: string;
  date: string;
}
export interface Repertoire {
  movieId: number;
  showings: Showing[];
}

@Component({
  selector: 'app-showings',
  templateUrl: './showings.component.html',
  styleUrls: ['./showings.component.scss'],
  providers: [ShowingsStateService],
})
export class ShowingsComponent implements OnInit {
  private showingsService = inject(ShowingsStateService);
  private currDay = inject(DatesService).getCurrentDay();
  private router = inject(Router);
  private routeParams = inject(ActivatedRoute).snapshot.paramMap;
  chosenDate = this.routeParams.get('date');
  repertoire$ = this.showingsService.showings$;

  ngOnInit(): void {
    if (this.chosenDate && this.chosenDate >= this.currDay) {
      this.fetchShowings(this.chosenDate);
    } else {
      this.router.navigate(['repertoire', this.currDay]);
    }
  }
  fetchShowings(date: string) {
    this.router.navigate(['repertoire', date]);
    this.showingsService.fetchShowings(date);
  }
}
