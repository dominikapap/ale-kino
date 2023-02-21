import { createInjectableType } from '@angular/compiler';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MovieShowing } from 'src/app/shared/interfaces/MovieShowing';
import { AddShowingsService } from '../addShowings/add-showings.service';

@Component({
  selector: 'app-showings-list',
  template: `
    <ng-container *ngIf="showings$ | async as showings"
      ><ol>
        <li *ngFor="let showing of showings.showingsList">
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
  private showingService = inject(AddShowingsService);
  private store = inject(Store);

  showings$ = this.store.select((store) => store.showingsState);

  ngOnInit() {
    this.showingService.getShowings();
  }
}
