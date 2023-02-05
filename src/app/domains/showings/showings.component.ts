import { Component, inject, OnInit } from '@angular/core';
import { UserStateService } from '../../core/user.state.service';
import { MovieDetails } from '../../interfaces/MovieDetails';
import { MovieShowing } from '../../interfaces/MovieShowing';
import { DatesService } from '../../services/dates.service';
import { MovieApiService } from '../../services/movieapi.service';

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
  private showings: MovieShowing[] = [];
  private currDay = '';
  filteredShowings: MovieShowing[] = [];
  movieDetails: MovieDetails[] = [];
  filteredShowingsId: MovieShowing[] = [];

  ngOnInit(): void {
    this.currDay = this.datesService.getCurrentDay();
    console.log(this.currDay);
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
    console.log(this.filteredShowings);
    if (day == this.currDay) {
      // const now = new Date();

      this.filteredShowings = this.filteredShowings.filter((element) =>
        this.checkIfHourPassed(element.timeFrom)
      );
    }
  }

  getID() {
    this.userStateService.getUserID();
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
}
