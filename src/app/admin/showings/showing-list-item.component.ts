import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MovieShowing } from 'src/app/shared/interfaces/MovieShowing';

@Component({
  selector: 'app-showings-list-item[showing]',
  standalone: true,
  template: `
    <p><b>Seans ID:</b> {{ showing.id }}</p>
    <p><b>Tytuł filmu : </b>{{ showing.movieTitle }}</p>
    <p><b>Data : </b>{{ showing.date }}</p>
    <p><b>Godzina rozpoczęcia : </b>{{ showing.timeFrom }}</p>
    <p><b>Godzina zakończenia : </b>{{ showing.timeTo }}</p>
    <p><b>Długość przerwy : </b>{{ showing.break }}min</p>
    <p><b>Sala dostępna po godzinie : </b>{{ showing.hallAvailableAfter }}</p>
    <p><b>Sala nr: </b>{{ showing.hallId }}</p>
    <p><b>Liczba rzędów w sali: </b>{{ showing.rows }}</p>
    <p><b>Liczba kolumn w sali: </b>{{ showing.columns }}</p>
  `,
  styles: [
    `
      b {
        color: rgb(14, 116, 144);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowingsListItemComponent {
  @Input() showing!: MovieShowing;
}
