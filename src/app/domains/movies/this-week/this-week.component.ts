import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DatesService } from '../services/dates.service';
import { Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-this-week',
  templateUrl: './this-week.component.html',
  styleUrls: ['./this-week.component.css'],
  providers: [DatesService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThisWeekComponent {
  @Output() chooseDay = new EventEmitter<string>();
  private routeParams = inject(ActivatedRoute).snapshot.paramMap;
  private datesService = inject(DatesService);
  chosenDate = this.routeParams.get('date');
  currDay = this.datesService.getCurrentDay();
  week = this.datesService.getCurrentWeek();

  pickDay(value: string) {
    this.chooseDay.emit(value);
  }
}
