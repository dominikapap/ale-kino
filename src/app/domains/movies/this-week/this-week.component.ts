import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { DatesService } from '../services/dates.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-this-week',
  templateUrl: './this-week.component.html',
  styleUrls: ['./this-week.component.css'],
  providers: [DatesService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThisWeekComponent {
  @Input() chosenDate!: string | null;
  @Input() currDay!: string;
  @Input() week!: string[];
  @Output() chooseDay = new EventEmitter<string>();

  pickDay(value: string) {
    this.chooseDay.emit(value);
  }
}
