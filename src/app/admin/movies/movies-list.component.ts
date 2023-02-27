import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MoviesActions } from './store/movies.actions';
import { selectMoviesList } from './store/movies.selector';

@Component({
  selector: 'app-movies-list',
  template: `
    <ng-container *ngIf="movies$ | async as movies">
      <h1 class="text-3xl font-bold  pb-1">Lista filmów</h1>
      <a routerLink="/admin/movies/add-movie" class="text-xl inline-flex"
        >Dodaj nowy film <mat-icon class="ml-2 text-lg">create</mat-icon></a
      >

      <ol class="pl-2 movies-list mt-4">
        <li *ngFor="let movie of movies">
          <p class="text-xl"><b>Tytuł filmu : </b>{{ movie.title }}</p>
          <p>
            <b>Plakat : </b><img [src]="movie.imageUrl" [alt]="movie.title" />
          </p>
          <p>
            <b>Kategorie : </b
            ><span *ngFor="let genre of movie.genres">{{ genre }} </span>
          </p>
          <p><b>Czas trwania : </b>{{ movie.duration }} min</p>
          <p><b>Ograniczenia wiekowe : </b>{{ movie.ageRestriction }}</p>
          <p><b>Opis krótki : </b>{{ movie.descriptionShort }}min</p>
          <p><b>Opis długi : </b>{{ movie.descriptionLong }}</p>
          <p><b>Premiera: </b>{{ movie.isPremiere ? 'tak' : 'nie' }}</p>
        </li>
      </ol>
    </ng-container>
  `,
  styles: [
    `
      :host {
        padding-top: 130px;
      }
      p {
        line-height: 2;
      }
      .movies-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(80vw, 400px), 1fr));
        gap: 2rem;
      }

      li {
        border: 2px solid white;
        padding: 0.5rem;
        border-radius: 10px;
      }
      li p:not(:last-child) {
        border-bottom: dashed 1px white;
      }
      b {
        color: rgb(14, 116, 144);
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
