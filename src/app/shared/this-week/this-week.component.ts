import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { DatesService } from '../services/dates.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-this-week',
  templateUrl: './this-week.component.html',
  styleUrls: ['./this-week.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThisWeekComponent implements OnInit {
  @Output() chooseDay = new EventEmitter<string>();

  week: string[] = [];
  currDay = '';

  pickDay(value: string) {
    this.chooseDay.emit(value);
  }

  private datesService = inject(DatesService);

  ngOnInit(): void {
    this.week = this.datesService.getCurrentWeek();
    this.currDay = this.datesService.getCurrentDay();
  }
}
