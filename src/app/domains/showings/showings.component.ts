import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserStateService } from '../../core/user.state.service';
import { MovieDetails } from '../../shared/interfaces/MovieDetails';
import { MovieShowing } from '../../shared/interfaces/MovieShowing';
import { DatesService } from '../../shared/services/dates.service';
import { MovieApiService } from '../../shared/services/movieapi.service';

export interface MovieRepertoire {
  title: string;
  id: number;
  showings: { hour: string; id: number };
}

@Component({
  selector: 'app-showings',
  templateUrl: './showings.component.html',
  styleUrls: ['./showings.component.css'],
})
export class ShowingsComponent implements OnInit {
  private movieApiService = inject(MovieApiService);
  private datesService = inject(DatesService);
  private userStateService = inject(UserStateService);
  private cdr = inject(ChangeDetectorRef);
  private showings: MovieShowing[] = [];
  private currDay = '';
  filteredShowings: MovieShowing[] = [];
  movieDetails$: Observable<MovieDetails[]> = of([]);
  filteredShowingsId: MovieShowing[] = [];

  ngOnInit(): void {
    this.currDay = this.datesService.getCurrentDay();

    this.movieDetails$ = this.movieApiService.getMovieDetailsList();

    this.movieApiService.getShowings().subscribe({
      next: (response) => {
        this.showings = response;
        this.filterShowings(this.currDay);
      },
    });
  }

  filterShowings(day: string) {
    this.filteredShowings = this.showings.filter(
      (element) => element.date == day
    );
    if (day == this.currDay) {
      this.filteredShowings = this.filteredShowings.filter((element) =>
        this.checkIfHourPassed(element.timeFrom)
      );
    }
  }

  getID(): number {
    return this.userStateService.getUserID();
  }

  checkIfMovieHasShowings(id: number): boolean {
    this.filteredShowingsId = this.filteredShowings.filter(
      (el) => el.movieId == id
    );
    return this.filteredShowingsId.length > 0;
  }
  private checkIfHourPassed(hour: string): boolean {
    return this.datesService.checkIfHourPassed(hour);
  }
}
