import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { MovieDetails } from '../domains/movies/movie-details/MovieDetails.interface';
import {
  AddShowingsApiService,
  ScreeningHall,
} from './add-showings-api.service';
import { AddShowingsService } from './add-showings.service';

type ShowingForm = FormGroup<{
  movieTitle: FormControl<string>;
  movieId: FormControl<number>;
  date: FormControl<string>;
  break: FormControl<number>;
  timeFrom: FormControl<string>;
  timeTo: FormControl<string>;
  hall: FormControl<number>;
  rows: FormControl<number>;
  columns: FormControl<number>;
}>;

@Component({
  selector: 'app-add-to-repertoire',
  templateUrl: 'add-to-repertoire.component.html',
  styles: [
    `
      form {
        display: flex;
        flex-direction: column;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddToRepertoireComponent {
  private builder = inject(NonNullableFormBuilder);
  private addShowingsApiService = inject(AddShowingsApiService);
  private addShowingStateService = inject(AddShowingsService);
  movies$ = this.addShowingsApiService.getMovies$();
  halls$ = this.addShowingsApiService.getHalls$();
  addShowingForm = this.createShowingForm();

  tommorrow = '2023-02-22';

  createShowingForm(): ShowingForm {
    const form = this.builder.group({
      movieTitle: this.builder.control('', {
        validators: [Validators.required, Validators.minLength(2)],
      }),
      movieId: this.builder.control(0, {
        validators: [Validators.required, Validators.minLength(2)],
      }),
      date: this.builder.control('', {
        validators: [Validators.required],
      }),
      break: this.builder.control(15, {
        validators: [Validators.required],
      }),
      timeFrom: this.builder.control('', {
        validators: [Validators.required],
      }),
      timeTo: this.builder.control('', {
        validators: [Validators.required],
      }),
      hall: this.builder.control(1, Validators.required),
      rows: this.builder.control(10, {
        validators: [Validators.required],
      }),
      columns: this.builder.control(10, {
        validators: [Validators.required],
      }),
    });
    return form;
  }

  addShowing(movies: MovieDetails[]) {
    this.addShowingForm.markAllAsTouched();
    this.setTimeToValue(movies);
    // this.setDateValue();
    console.log(this.addShowingForm.value);
    this.addShowingStateService.add(this.addShowingForm.getRawValue());
  }

  private setDateValue() {
    this.addShowingForm.controls.date.setValue(
      this.addShowingForm.controls.date.value
    );
  }

  updateMovieId(_event: { value: string }, movies: MovieDetails[]) {
    const movie = movies.find((movie) => movie.title === _event.value);
    movie ? this.addShowingForm.controls.movieId.setValue(movie.id) : null;
  }
  updateRowsAndColumns(_event: { value: string }, halls: ScreeningHall[]) {
    const hall = halls.find((hall) => hall.name === _event.value);

    if (hall) {
      this.addShowingForm.controls.rows.setValue(hall.rows);
      this.addShowingForm.controls.columns.setValue(hall.columns);
      this.addShowingForm.controls.hall.setValue(hall.id);
    }
  }

  private setTimeToValue(movies: MovieDetails[]) {
    const movie = movies.find(
      (movie) => movie.title === this.addShowingForm.controls.movieTitle.value
    );
    const movieDuration = movie?.duration as string;
    this.addShowingForm.controls.timeTo.setValue(
      this.countTimeTo(
        this.addShowingForm.controls.timeFrom.value,
        movieDuration
      )
    );
  }
  private countTimeTo(timeFrom: string, duration: string) {
    return new Date(
      new Date('1970/01/01 ' + timeFrom).getTime() + parseInt(duration) * 60000
    )
      .toString()
      .slice(15, 21);
  }
}