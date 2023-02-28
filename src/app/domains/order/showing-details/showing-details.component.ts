import { AsyncPipe, NgIf, SlicePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { Observable } from 'rxjs';
import { MovieShowing } from 'src/app/shared/interfaces/MovieShowing';
import { ShowingDetailsApiService } from './showing-details.api.service';

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

  private showingService = inject(ShowingDetailsApiService);
  showingDetails$!: Observable<MovieShowing>;

  ngOnInit() {
    this.showingDetails$ = this.showingService.getShowingDetails(
      this.showingId
    );
  }
}
