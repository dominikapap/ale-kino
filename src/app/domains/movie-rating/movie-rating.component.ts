import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { AveragePipe } from 'src/app/shared/pipes';
import { UserStateService } from '../../core/user.state.service';
import { MovieRatingService } from './movie-rating.service';

type RatingForm = FormGroup<{
  rating: FormControl<number>;
}>;

@Component({
  selector: 'app-movie-rating',
  standalone: true,
  templateUrl: './movie-rating.component.html',
  styleUrls: ['./movie-rating.component.css'],
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatRadioModule,
    AveragePipe,
    CommonModule,
  ],
  providers: [MovieRatingService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieRatingComponent {
  @Input() movieId = 0;
  private builder = inject(NonNullableFormBuilder);
  showRatingForm = false;
  ratingForm = this.createMovieRatingForm();
  showThankYou = false;
  movieRatingService = inject(MovieRatingService);
  userStateService = inject(UserStateService);
  userID = this.userStateService.getUserID();
  rating$ = inject(MovieRatingService).movieRating$;
  ratingList$ = inject(MovieRatingService).movieRatingList$;

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
    const ratingForm = this.builder.group({
      rating: this.builder.control(0),
    });
    return ratingForm;
  }
}
