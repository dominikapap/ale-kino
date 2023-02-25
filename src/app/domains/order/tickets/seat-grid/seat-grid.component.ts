import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { BookedSeatsStateService } from '../../services/booked-seats.state.service';
import { ReservedSeatsService } from '../reserved-seats.state.service';
import { CreateSeatGridStateService } from './create-seat-grid.service';

@Component({
  selector: 'app-seat-grid',
  template: ` <div class="rows" *ngFor="let row of rowsA$ | async">
    <span class="row">{{ row }} </span>
    <span
      class="column-seats"
      *ngFor="let column of columns$ | async; let index = index"
      [ngClass]="
        onCheckBookedSeats(row, column)
          ? 'booked-seat'
          : onCheckReservedSeats(row, column)
          ? 'reserved-seat'
          : ''
      "
      (click)="onChooseSeat(row, column)"
    >
      {{ column }}
    </span>
  </div>`,
  styles: [
    `
      .rows {
        margin-inline: auto;
        margin-bottom: 1rem;
      }

      .column-seats,
      .row {
        width: 200px;
        border: 1px solid black;
        padding: 0.5rem;
        margin: 0.5rem;
        display: table-cell;
        text-align: center;
      }

      .column-seats {
        background-color: #1f62cc;
        cursor: pointer;
      }

      .row {
        background-color: black;
      }

      .booked-seat {
        background-color: red;
        pointer-events: none;
      }

      .reserved-seat {
        background-color: orange;
        pointer-events: none;
      }
    `,
  ],
})
export class SeatGridComponent {
  @Input() showingId = 0;
  @Output() chooseSeat = new EventEmitter<{ row: string; column: number }>();
  private cdr = inject(ChangeDetectorRef);
  private gridSeatService = inject(CreateSeatGridStateService);
  private reservedSeatsService = inject(ReservedSeatsService);
  private bookedSeatsService = inject(BookedSeatsStateService);
  rowsA$ = inject(CreateSeatGridStateService).seatGridRows$;
  columns$ = inject(CreateSeatGridStateService).seatGridColumns$;

  ngOnInit() {
    this.reservedSeatsService.getReservedSeats(this.showingId);
    this.bookedSeatsService.getBookedSeats(this.showingId);
    this.gridSeatService.getSeatGrid(this.showingId);
  }

  onCheckReservedSeats(row: string, column: number): boolean {
    return this.reservedSeatsService.canReserve(row, column);
  }

  onCheckBookedSeats(row: string, column: number): boolean {
    return this.bookedSeatsService.canBook(row, column);
  }

  onChooseSeat(row: string, column: number) {
    this.chooseSeat.emit({ row: row, column: column });
  }
}
