import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { MovieRating, Ratings } from '../interfaces/MovieRating';
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

  movieRatings: Ratings[] = [];
  currentRating: number = 0;
  userID: number = 168396; //tymczasowe
  showRatingForm: boolean = false;
  ratingForm = this.createMovieRatingForm();
  showThankYou: boolean = false;

  constructor(
    private movieRatingService: MovieRatingService,
    private builder: NonNullableFormBuilder
  ) {}

  ngOnInit(): void {
    if (this.movieId) {
      this.movieRatingService.getMovieRating(this.movieId).subscribe({
        next: (response: MovieRating[]) => {
          this.movieRatings = response[0].ratings;
          this.getCurrentRating(this.movieRatings);
        },
      });
    }
  }
  getCurrentRating(ratings: Ratings[]) {
    ratings.forEach((element: Ratings) => {
      this.currentRating += element.rating;
    });
    this.currentRating /= ratings.length;
  }
  checkIfUserRated(userID: number) {
    if (this.movieRatings.length) {
      return this.movieRatings.filter(
        (element: Ratings) => element.userID == userID
      ).length;
    } else {
      return 0;
    }
  }
  rateMovie(userID: number) {
    console.log(userID);
    console.log(this.ratingForm.controls.rating.value);
    this.showRatingForm = !this.showRatingForm;
    this.showThankYou = true;
  }

  private createMovieRatingForm(): RatingForm {
    const ratingForm = this.builder.group({
      rating: this.builder.control(0),
    });
    return ratingForm;
  }
}
