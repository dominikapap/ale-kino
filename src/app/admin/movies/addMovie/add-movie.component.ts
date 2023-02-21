import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { MoviesApiService, ScreeningHall } from '../movies-api.service';
import { MoviesService } from '../movies.service';

type MovieForm = FormGroup<{
  title: FormControl<string>;
  imageUrl: FormControl<string>;
  genres: FormControl<string[]>;
  duration: FormControl<string>;
  ageRestriction: FormControl<string>;
  descriptionShort: FormControl<string>;
  descriptionLong: FormControl<string>;
  isPremiere: FormControl<boolean>;
}>;

@Component({
  selector: 'app-add-movie',
  templateUrl: 'add-movie.component.html',
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
export class AddMovieComponent {
  private builder = inject(NonNullableFormBuilder);
  private moviesApiService = inject(MoviesApiService);
  private moviesService = inject(MoviesService);

  addMovieForm = this.createMovieForm();

  createMovieForm(): MovieForm {
    const form = this.builder.group({
      title: this.builder.control('', {
        validators: [Validators.required, Validators.minLength(2)],
      }),
      imageUrl: this.builder.control('', {
        validators: [Validators.required, Validators.minLength(5)],
      }),
      genres: this.builder.control([''], {
        validators: [Validators.required],
      }),
      duration: this.builder.control('90', {
        validators: [Validators.required],
      }),
      ageRestriction: this.builder.control('Dla wszystkich', {
        validators: [Validators.required],
      }),
      descriptionShort: this.builder.control('', {
        validators: [Validators.required],
      }),
      descriptionLong: this.builder.control('1', Validators.required),
      isPremiere: this.builder.control(false, {
        validators: [Validators.required],
      }),
    });
    return form;
  }

  addMovie() {
    this.addMovieForm.markAllAsTouched();
    if (this.addMovieForm.valid) {
      this.moviesService.add(this.addMovieForm.getRawValue());
    }
  }
}
