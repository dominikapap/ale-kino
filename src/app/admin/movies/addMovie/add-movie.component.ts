import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { MoviesApiService } from '../movies-api.service';
import { MoviesActions } from '../store/movies.actions';

type MovieForm = FormGroup<{
  title: FormControl<string>;
  id: FormControl<string>;
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
      :host {
        padding-top: 120px;
      }
      .form-fields {
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(800px, 1fr));
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddMovieComponent {
  private builder = inject(NonNullableFormBuilder);
  private store = inject(Store);
  private moviesApiService = inject(MoviesApiService);

  get titleCtrl() {
    return this.addMovieForm.controls.title;
  }
  get imageUrlCtrl() {
    return this.addMovieForm.controls.imageUrl;
  }
  get ageRestrictionCtrl() {
    return this.addMovieForm.controls.ageRestriction;
  }
  get descriptionLongCtrl() {
    return this.addMovieForm.controls.descriptionLong;
  }
  get descriptionShortCtrl() {
    return this.addMovieForm.controls.descriptionShort;
  }
  get durationCtrl() {
    return this.addMovieForm.controls.duration;
  }
  get genresCtrl() {
    return this.addMovieForm.controls.genres;
  }
  get isPremiereCtrl() {
    return this.addMovieForm.controls.isPremiere;
  }

  addMovieForm = this.createMovieForm();
  genres$ = this.moviesApiService.getGenres$();
  ageRestriction$ = this.moviesApiService.getAgeRestrictions$();
  createMovieForm(): MovieForm {
    const form = this.builder.group({
      title: this.builder.control('', {
        validators: [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      }),
      imageUrl: this.builder.control('', {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(150),
        ],
      }),
      id: this.builder.control('', {
        validators: [Validators.required],
      }),
      genres: this.builder.control([] as Array<string>, {
        validators: [Validators.required, Validators.maxLength(5)],
      }),
      duration: this.builder.control('', {
        validators: [
          Validators.required,
          Validators.min(5),
          Validators.max(3000),
        ],
      }),
      ageRestriction: this.builder.control('', {
        validators: [Validators.required],
      }),
      descriptionShort: this.builder.control('', {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(1000),
        ],
      }),
      descriptionLong: this.builder.control('', {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(1500),
        ],
      }),
      isPremiere: this.builder.control(false, {
        validators: [Validators.required],
      }),
    });
    return form;
  }

  onSubmit() {
    this.addMovieForm.markAllAsTouched();
    this.addMovieForm.controls.id.setValue('6');
    if (this.addMovieForm.valid) {
      this.store.dispatch(
        MoviesActions.addNewMovie(this.addMovieForm.getRawValue())
      );
    }
  }
}
