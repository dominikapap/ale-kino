import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ShowingsService } from './showings.service';
import { selectShowingsList } from './store/showings.selector';

@Component({
  selector: 'app-showings-list',
  template: `
    <ng-container *ngIf="showings$ | async as showings; else listEmpty">
      <h1 class="text-3xl font-bold  pb-1">Lista seansów</h1>
      <a routerLink="/admin/showings/add-showing">Dodaj nowy seans</a>
      <ol>
        <li *ngFor="let showing of showings">
          <p><b>Seans ID:</b> {{ showing.id }}</p>
          <p><b>Tytuł filmu : </b>{{ showing.movieTitle }}</p>
          <p><b>Data : </b>{{ showing.date }}</p>
          <p><b>Godzina rozpoczęcia : </b>{{ showing.timeFrom }}</p>
          <p><b>Godzina zakończenia : </b>{{ showing.timeTo }}</p>
          <p><b>Długość przerwy : </b>{{ showing.break }}min</p>
          <p><b>Sala : </b>{{ showing.hallId }}</p>
          <p><b>Liczba rzędów w sali: </b>{{ showing.rows }}</p>
          <p><b>Liczba kolumn w sali: </b>{{ showing.columns }}</p>
        </li>
      </ol>
    </ng-container>
    <ng-template #listEmpty
      ><p>
        Nie udało się załadować danych, spróbn ponwnie później
      </p></ng-template
    >
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
export class ShowingsListComponent {
  private showingService = inject(ShowingsService);
  private store = inject(Store);

  showings$ = this.store.select(selectShowingsList);

  ngOnInit() {
    this.showingService.getShowings();
  }
}
