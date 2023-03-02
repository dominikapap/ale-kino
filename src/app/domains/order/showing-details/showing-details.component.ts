import { AsyncPipe, NgIf, SlicePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MovieShowing } from 'src/app/shared/interfaces/MovieShowing';

@Component({
  selector: 'app-showing-details',
  standalone: true,
  templateUrl: './showing-details.component.html',
  styles: [
    `
      :host {
        display: inline;
        margin: 2rem 0;
      }
    `,
  ],
  imports: [NgIf, AsyncPipe, SlicePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ShowingDetailsComponent {
  @Input() showingId = 0;
  @Input() showingDetails!: MovieShowing;

  // ngOnInit() {
  //   this.showingDetails$ = this.showingService.getShowingDetails(
  //     this.showingId
  //   );
  // }
}
