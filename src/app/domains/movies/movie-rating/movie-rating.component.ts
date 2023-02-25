import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { AuthStateService, UserStateService } from 'src/app/auth';
import { AveragePipe } from 'src/app/shared';
import { MovieApiService } from '../../order';
import { MovieRatingApiService } from './movie-rating.api.service';
import { MovieRatingStateService } from './movie-rating.state.service';

type RatingForm = FormGroup<{
  rating: FormControl<number>;
}>;

@Component({
  selector: 'app-movie-rating',
  standalone: true,
  templateUrl: './movie-rating.component.html',
  styleUrls: ['./movie-rating.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatRadioModule,
    AveragePipe,
    CommonModule,
  ],
  providers: [MovieRatingStateService, MovieRatingApiService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieRatingComponent implements OnInit {
  @Input() movieId = '';
  private builder = inject(NonNullableFormBuilder);
  auth$ = inject(AuthStateService).auth$;
  movieRatingStateService = inject(MovieRatingStateService);
  ratingList$ = inject(MovieRatingStateService).movieRatingList$;
  userID = inject(UserStateService).getUserID();
  ratingForm = this.createMovieRatingForm();
  showThankYou = false;
  showRatingForm = false;

  ngOnInit() {
    this.movieRatingStateService.getMovieRatings(this.movieId);
  }

  checkIfUserRated() {
    return this.movieRatingStateService.checkIfUserRated();
  }

  rateMovie(userID: number, movieID: string) {
    this.movieRatingStateService.updateMovieRating(
      userID,
      +this.ratingForm.controls.rating.value,
      movieID
    );
    this.hideRatingForm();
    this.showThankYouForm();
  }

  private hideRatingForm() {
    this.showRatingForm = !this.showRatingForm;
  }
  private showThankYouForm() {
    this.showThankYou = true;
  }

  private createMovieRatingForm(): RatingForm {
    const ratingForm = this.builder.group({
      rating: this.builder.control(0),
    });
    return ratingForm;
  }
}
