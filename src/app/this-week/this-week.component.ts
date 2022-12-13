import { Component, OnInit } from '@angular/core';
import { DatesService } from '../services/dates.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-this-week',
  templateUrl: './this-week.component.html',
  styleUrls: ['./this-week.component.css'],
})
export class ThisWeekComponent implements OnInit {
  @Output() chooseDay = new EventEmitter<string>();

  week: string[] = [];
  currDay: string = '';

  pickDay(value: string) {
    this.chooseDay.emit(value);
  }

  constructor(private datesService: DatesService) {}

  ngOnInit(): void {
    this.week = this.datesService.getCurrentWeek();
    this.currDay = this.datesService.getCurrentDay();
  }
}
