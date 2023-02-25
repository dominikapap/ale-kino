import { inject, Injectable } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';
import { MovieDetails } from 'src/app/domains/movies/movie-details/MovieDetails.interface';
import { ScreeningHall } from '../showings-api.service';
import { TimeslotValidator } from './timeslotValidator';

export type ShowingForm = FormGroup<{
  movieTitle: FormControl<string>;
  movieId: FormControl<string>;
  date: FormControl<string>;
  timeFrom: FormControl<string>;
  timeTo: FormControl<string>;
  break: FormControl<number>;
  hallId: FormControl<number>;
  rows: FormControl<number>;
  columns: FormControl<number>;
  hallAvailableAfter: FormControl<string>;
}>;

@Injectable({
  providedIn: 'root',
})
export class AddShowingFormService {
  private timeslotValidator = inject(TimeslotValidator);
  private builder = inject(NonNullableFormBuilder);

  get tomorrow() {
    const today = moment();
    const tomorrow = today.clone().add(1, 'days').toISOString();
    return tomorrow;
  }

  createShowingForm(): ShowingForm {
    const form = this.builder.group(
      {
        movieTitle: this.builder.control('', {
          validators: [Validators.required],
        }),
        movieId: this.builder.control('0', {
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
        timeTo: this.builder.control(''),
        hallAvailableAfter: this.builder.control(''),
        hallId: this.builder.control(
          null as unknown as number,
          Validators.required
        ),
        rows: this.builder.control(10, {
          validators: [Validators.required],
        }),
        columns: this.builder.control(10, {
          validators: [Validators.required],
        }),
      },
      {
        validators: [],
        asyncValidators: [
          this.timeslotValidator.validate.bind(this.timeslotValidator),
        ],
      }
    );
    return form;
  }

  updateMovieId(
    event: { value: string },
    movies: MovieDetails[],
    form: ShowingForm
  ) {
    const movie = movies.find((movie) => movie.title === event.value);
    movie ? form.controls.movieId.setValue(movie.id) : null;
  }

  updateRowsAndColumns(
    event: { value: string },
    halls: ScreeningHall[],
    form: ShowingForm
  ) {
    const hall = halls.find((hall) => hall.name === event.value);

    if (hall) {
      form.controls.rows.setValue(hall.rows);
      form.controls.columns.setValue(hall.columns);
      form.controls.hallId.setValue(hall.id);
    }
  }

  setControlsValues(
    movies: MovieDetails[],
    titleFromForm: string,
    timeToCtrl: FormControl,
    timeFromCtrl: FormControl,
    hallAvailableCtrl: FormControl,
    breakCtrl: FormControl,
    dateCtrl: FormControl
  ) {
    this.setTimeToValue(movies, titleFromForm, timeToCtrl, timeFromCtrl);
    this.setHallAvailableValue(hallAvailableCtrl, timeToCtrl, breakCtrl);
    this.setDateValue(dateCtrl);
  }

  setTimeToValue(
    movies: MovieDetails[],
    titleFromForm: string,
    timeToCtrl: FormControl,
    timeFromCtrl: FormControl
  ) {
    const movie = movies.find((movie) => movie.title === titleFromForm);
    const movieDuration = movie?.duration as string;
    timeToCtrl.setValue(
      this.countTimeTo(timeFromCtrl.value, movieDuration).slice(1, 6)
    );
  }

  setHallAvailableValue(
    hallAvailableCtrl: FormControl,
    timeToCtrl: FormControl,
    breakCtrl: FormControl
  ) {
    hallAvailableCtrl.setValue(
      this.countTimeTo(timeToCtrl.value, breakCtrl.value.toString()).slice(1, 6)
    );
  }
  private setDateValue(dateCtrl: FormControl) {
    dateCtrl.setValue(
      moment(dateCtrl.value, 'MM-DD-YYYY').format().slice(0, 10)
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
