import { createInjectableType } from '@angular/compiler';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../auth';
import { UserStateService } from '../../core/user-state.service';
import { MovieDetails } from '../../interfaces/MovieDetails';
import { MovieShowing } from '../../interfaces/MovieShowing';
import { DatesService } from '../../services/dates.service';
import { MovieApiService } from '../../services/movieapi.service';
import { WatchListService } from '../watch-list';

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
  description = false;
  currDay = '';
  filteredShowingsId: MovieShowing[] = [];

  private movieApiService = inject(MovieApiService);
  private datesService = inject(DatesService);
  private watchlistService = inject(WatchListService);
  private auth = inject(AuthService);
  private userStateService = inject(UserStateService);

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
        this.filterShowings(this.currDay);
      },
    });
  }

  filterShowings(day: string) {
    this.filteredShowings = this.showings.filter(
      (element) => element.date == day
    );
    if (day == this.currDay) {
      const now = new Date();

      this.filteredShowings = this.filteredShowings.filter((element) =>
        this.checkIfHourPassed(element.timeFrom)
      );
    }
  }

  getID() {
    this.userStateService.getUserID();
  }
  onWatchlist(movieTitle: string): boolean {
    return this.watchlistService.checkIfOnWatchlist(movieTitle);
  }

  checkIfHourPassed(hour: string) {
    const now = new Date();
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

  onUpdateWatchlist(movieTitle: string, movieID: number) {
    this.watchlistService.addToWatchlist(movieTitle, movieID);
  }

  hasAuth() {
    return this.auth.checkIfHasAuth();
  }
}
