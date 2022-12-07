import { Component, OnInit } from '@angular/core';
import { MovieDetails } from '../interfaces/MovieDetails';
import { MovieShowing } from '../interfaces/MovieShowing';
import { CurrentShowingService } from '../services/current-showing.service';
import { DatesService } from '../services/dates.service';
import { MovieApiService } from '../services/movieapi.service';

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
  showings: MovieShowing[] = [];
  filteredShowings: MovieShowing[] = [];
  week: string[] = [];
  currDay: string = '';
  movieDetails: MovieDetails[] = [];
  description: boolean = false;
  currentShowingInfo: unknown;

  constructor(
    private movieApiService: MovieApiService,
    private datesService: DatesService,
    private currentShowing: CurrentShowingService
  ) {}

  ngOnInit(): void {
    this.movieApiService.getMovieApiDataMovieDetails().subscribe({
      next: (response) => {
        this.movieDetails = response;
      },
    });
    this.week = this.datesService.getCurrentWeek();
    this.currDay = this.datesService.getCurrentDay();
    this.movieApiService.getMovieApiDataShowings().subscribe({
      next: (response) => {
        this.showings = response;
        this.filteredShowings = this.showings.filter(
          (element) => element.date == this.currDay
        );
      },
    });
    this.currentShowing.currentShowingInfo$.subscribe(
      (value) => (this.currentShowingInfo = value)
    );
  }

  filterShowings(day: string) {
    this.filteredShowings = this.showings.filter(
      (element) => element.date == day
    );
  }

  updateCurrentShowing(id: number) {
    let current = this.filteredShowings.filter((element) => (element.id = id));
    this.currentShowing.setCurrentShowing(current[0]);
  }

  compareHours(hour: string): boolean {
    let now = new Date();
    if (hour > `${now.getHours()}:${now.getMinutes()}`) {
      return true;
    } else {
      return false;
    }
  }
}
