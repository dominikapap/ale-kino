import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { UserStateService } from '../../core/user-state.service';
import { MovieRatingService } from './movie-rating.service';

type RatingForm = FormGroup<{
  rating: FormControl<number>;
}>;

@Component({
  selector: 'app-movie-rating',
  templateUrl: './movie-rating.component.html',
  styleUrls: ['./movie-rating.component.css'],
  providers: [MovieRatingService],
})
export class MovieRatingComponent {
  @Input() movieId = 0;

  showRatingForm = false;
  ratingForm = this.createMovieRatingForm();
  showThankYou = false;
  movieRatingService = inject(MovieRatingService);

  userStateService = inject(UserStateService);
  userID = this.userStateService.getUserID();
  rating$ = inject(MovieRatingService).movieRating$;
  ratingList$ = inject(MovieRatingService).movieRatingList$;

  constructor(private builder: NonNullableFormBuilder) {}

  ngOnInit() {
    this.movieRatingService.getMovieRatings(this.movieId);
  }

  checkIfUserRated() {
    return this.movieRatingService.checkIfUserRated();
  }

  rateMovie(userID: number, movieID: number) {
    this.movieRatingService.updateMovieRating(
      userID,
      +this.ratingForm.controls.rating.value,
      movieID
    );
    this.hideRatingForm();
    this.showThankYouForm();
  }

  hideRatingForm() {
    this.showRatingForm = !this.showRatingForm;
  }
  showThankYouForm() {
    this.showThankYou = true;
  }

  createMovieRatingForm(): RatingForm {
    console.log('test');
    const ratingForm = this.builder.group({
      rating: this.builder.control(0),
    });
    return ratingForm;
  }
}
