import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { UserStateService } from '../../core/user-state.service';
import { MovieRatings } from '../../interfaces/MovieRating';
import { MovieRatingService } from './movie-rating.service';

type RatingForm = FormGroup<{
  rating: FormControl<number>;
}>;

@Component({
  selector: 'app-movie-rating',
  templateUrl: './movie-rating.component.html',
  styleUrls: ['./movie-rating.component.css'],
})
export class MovieRatingComponent implements OnInit {
  @Input() movieId = 0;

  movieRatings: MovieRatings[] = [];
  currentRating: number = 0;
  userID: number = 168395; //tymczasowe
  showRatingForm = false;
  ratingForm = this.createMovieRatingForm();
  showThankYou = false;

  constructor(
    private movieRatingService: MovieRatingService,
    private builder: NonNullableFormBuilder,
    private userStateService: UserStateService
  ) {}

  ngOnInit(): void {
    // this.movieRatingService.getMovieRatings(this.movieId);
    this.movieRatingService.getMovieRating(this.movieId).subscribe({
      next: (response: MovieRatings[]) => {
        this.movieRatings = response;
        this.getCurrentRating(this.movieRatings);
        this.userID = this.userStateService.getUserID();
      },
    });
  }
  getCurrentRating(ratings: MovieRatings[]) {
    ratings.forEach((element: MovieRatings) => {
      this.currentRating += element.rating;
    });
    this.currentRating /= ratings.length;
  }
  checkIfUserRated(userID: number) {
    if (this.movieRatings.length) {
      return this.movieRatings.filter(
        (element: MovieRatings) => element.userID == userID
      ).length;
    } else {
      return false;
    }
  }
  rateMovie(userID: number, movieID: number) {
    this.movieRatingService
      .updateMovieRating(
        userID,
        +this.ratingForm.controls.rating.value,
        movieID
      )
      .subscribe();
    console.log(userID, this.ratingForm.controls.rating.value, movieID);
    this.hideRatingForm();
    this.showThankYouForm();
  }

  hideRatingForm() {
    this.showRatingForm = !this.showRatingForm;
  }
  showThankYouForm() {
    this.showThankYou = true;
  }

  private createMovieRatingForm(): RatingForm {
    const ratingForm = this.builder.group({
      rating: this.builder.control(0),
    });
    return ratingForm;
  }
}
