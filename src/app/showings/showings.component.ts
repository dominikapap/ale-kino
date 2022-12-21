import { Component, OnInit } from '@angular/core';
import { MovieDetails } from '../interfaces/MovieDetails';
import { MovieShowing } from '../interfaces/MovieShowing';
import { CurrentShowingService } from '../services/current-showing.service';
import { DatesService } from '../services/dates.service';
import { MovieApiService } from '../services/movieapi.service';
import { WatchListService } from '../services/watch-list.service';

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

  movieDetails: MovieDetails[] = [];
  description: boolean = false;
  currDay: string = '';
  filteredShowingsId: MovieShowing[] = [];
  // currentShowingInfo: unknown;

  constructor(
    private movieApiService: MovieApiService,
    private datesService: DatesService, // private currentShowing: CurrentShowingService,
    private watchlistService: WatchListService
  ) {}

  ngOnInit(): void {
    this.currDay = this.datesService.getCurrentDay();
    this.movieApiService.getMovieApiDataMovieDetails().subscribe({
      next: (response) => {
        this.movieDetails = response;
      },
    });

    this.movieApiService.getMovieApiDataShowings().subscribe({
      next: (response) => {
        this.showings = response;
        // this.filteredShowings = this.showings.filter(
        //   (element) => element.date == this.currDay
        // );
        this.filterShowings(this.currDay);
      },
    });
    // this.currentShowing.currentShowingInfo$.subscribe(
    //   (value) => (this.currentShowingInfo = value)
    // );
    // this.movieApiService
    //   .getMovieApiDataShowingForWeek('2022-12-09')
    //   .subscribe({ next: (response) => console.log(response) });
  }

  filterShowings(day: string) {
    this.filteredShowings = this.showings.filter(
      (element) => element.date == day
    );
    if (day == this.currDay) {
      let now = new Date();
      console.log(this.filteredShowings);
      this.filteredShowings = this.filteredShowings.filter((element) =>
        this.checkIfHourPassed(element.timeFrom)
      );
      console.log(this.filteredShowings);
    }
  }

  checkIfHourPassed(hour: string) {
    let now = new Date();
    if (parseInt(hour.split(':')[0]) < now.getHours()) {
      return false;
    } else if (parseInt(hour.split(':')[0]) == now.getHours()) {
      if (parseInt(hour.split(':')[1]) > now.getMinutes()) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  checkIfMovieHasShowings(id: number) {
    this.filteredShowingsId = this.filteredShowings.filter(
      (el) => el.movieId == id
    );
    return this.filteredShowingsId.length > 0;
  }

  onUpdateWatchlist(movieTitle: string, userId: number) {
    this.watchlistService.updateWatchlist(movieTitle, userId);
  }

  // updateCurrentShowing(id: number) {
  //   let current = this.filteredShowings.filter((element) => (element.id = id));
  //   this.currentShowing.setCurrentShowing(current[0]);
  // }

  // compareHours(hour: string, day: string): boolean {
  //   let now = new Date();
  //   const today = String(now.getDate()).padStart(2, '0');
  //   if (
  //     (day == `${now.getFullYear()}-${now.getMonth() + 1}-${today}` &&
  //       hour > `${now.getHours()}:${now.getMinutes()}`) ||
  //     day > `${now.getFullYear()}-${now.getMonth() + 1}-${today}`
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
}
