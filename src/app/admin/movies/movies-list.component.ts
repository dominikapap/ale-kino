import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MoviesActions } from './store/movies.actions';
import { selectMoviesList } from './store/movies.selector';

@Component({
  selector: 'app-movies-list',
  template: `
    <ng-container *ngIf="movies$ | async as movies">
      <h1 class="text-3xl font-bold  pb-1">Lista filmów</h1>
      <a routerLink="/admin/movies/add-movie">Dodaj nowy film</a>
      <ol>
        <li *ngFor="let movie of movies">
          <p><b>Tytuł filmu : </b>{{ movie.title }}</p>
          <p>
            <b>Plakat : </b><img [src]="movie.imageUrl" alt="movie.title" />
          </p>
          <p><b>Kategorie : </b>{{ movie.genres }}</p>
          <p><b>Czas trwania : </b>{{ movie.duration }} min</p>
          <p><b>Ograniczenia wiekowe : </b>{{ movie.ageRestriction }}</p>
          <p><b>Opis krótki : </b>{{ movie.descriptionShort }}min</p>
          <p><b>Opis długi : </b>{{ movie.descriptionLong }}</p>
          <p><b>Premiera: </b>{{ movie.isPremiere }}</p>
        </li>
      </ol>
    </ng-container>
  `,
  styles: [
    `
      p {
        line-height: 2;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesListComponent {
  private store = inject(Store);

  movies$ = this.store.select(selectMoviesList);

  ngOnInit() {
    this.store.dispatch(MoviesActions.getAllMovies());
  }
}
