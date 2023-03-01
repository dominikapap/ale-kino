import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';
import { ShowingsApiService } from '../showings-api.service';
import { ShowingsActions } from '../store/showings.actions';
import { selectShowingsList } from '../store/showings.selector';

@Component({
  selector: 'app-showings-list',
  template: `
    <ng-container *ngIf="showings$ | async as showings; else listEmpty">
      <h1 class="text-3xl font-bold  pb-1">Lista nadchodzących seansów</h1>
      <a routerLink="/admin/showings/add-showing" class="text-xl inline-flex"
        >Dodaj nowy seans <mat-icon class="ml-2 text-lg ">create</mat-icon></a
      >
      <ng-container *ngIf="dataForShowing$ | async as data" ;
        ><div class="mt-4">
          <mat-form-field appearance="fill" class="mr-2">
            <mat-label>Filtruj po nazwie filmu</mat-label>
            <mat-select
              (selectionChange)="filterByTitle(titleCtrl.value)"
              [formControl]="titleCtrl"
            >
              <mat-option value="Wszystkie">Wszystkie</mat-option>
              <mat-option
                [value]="movie.title"
                *ngFor="let movie of data.movies; let index = index"
                class="mt-2 title-option"
                >{{ movie.title }}
              </mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="fill">
            <mat-label>Filtruj po sali</mat-label>
            <mat-select
              (selectionChange)="filterByHall(hallCtrl.value)"
              [formControl]="hallCtrl"
            >
              <mat-option value="Wszystkie">Wszytskie</mat-option>
              <mat-option [value]="hall.id" *ngFor="let hall of data.halls"
                >{{ hall.name }}, nr: {{ hall.id }}</mat-option
              >
            </mat-select>
          </mat-form-field>
        </div></ng-container
      >
      <ol class="pl-2 showing-list mt-4">
        <li *ngFor="let showing of showings">
          <app-showings-list-item [showing]="showing"></app-showings-list-item>
        </li>
      </ol>
    </ng-container>
    <ng-template #listEmpty
      ><p>
        Nie udało się załadować danych, spróbuj ponwnie później
      </p></ng-template
    >
  `,
  styles: [
    `
      :host {
        padding-top: 130px;
      }
      p {
        line-height: 2;
      }
      .showing-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(350px, 80vw), 1fr));
        gap: 2rem;
      }

      li {
        border: 2px solid white;
        padding: 0.5rem;
        border-radius: 10px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowingsListComponent implements OnInit {
  private store = inject(Store);
  private showingsApiService = inject(ShowingsApiService);
  showings$ = this.store.select(selectShowingsList);
  allShowings$ = this.showings$;
  movies$ = this.showingsApiService.getMovies();
  halls$ = this.showingsApiService.getHalls();
  dataForShowing$ = combineLatest([this.movies$, this.halls$]).pipe(
    map(([movies, halls]) => ({ movies, halls }))
  );
  titleCtrl = new FormControl('Wszystkie');
  hallCtrl = new FormControl('Wszystkie');

  ngOnInit() {
    this.store.dispatch(ShowingsActions.getAllShowings());
  }

  filterByTitle(ctrlValue: string | null) {
    if (ctrlValue && ctrlValue !== 'Wszystkie') {
      this.showings$ = this.allShowings$.pipe(
        map((result) => result.filter((item) => item.movieTitle == ctrlValue))
      );
    } else {
      this.showings$ = this.allShowings$;
    }
  }

  filterByHall(ctrlValue: string | null) {
    if (ctrlValue && ctrlValue.toString() !== 'Wszystkie') {
      this.showings$ = this.allShowings$.pipe(
        map((result) =>
          result.filter((item) => item.hallId.toString() == ctrlValue)
        )
      );
    } else {
      this.showings$ = this.allShowings$;
    }
  }
}
