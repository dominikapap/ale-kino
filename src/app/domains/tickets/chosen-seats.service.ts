import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export interface ChosenSeat {
  rowSeat: string;
  columnSeat: number;
  ticketTypeName: string;
  ticketPrice: number;
}

@Injectable({
  providedIn: 'root',
})
export class ChosenSeatsService {
  private chosenSeats$$ = new BehaviorSubject<ChosenSeat[]>([]);
  get chosenSeat$() {
    return this.chosenSeats$$.asObservable();
  }

  addSeat(SeatInfo: any) {
    this.chosenSeats$$.next([
      ...this.chosenSeats$$.value,
      {
        rowSeat: SeatInfo.rowSeat,
        columnSeat: SeatInfo.columnSeat,
        ticketTypeName: SeatInfo.ticketTypeName,
        ticketPrice: SeatInfo.ticketPrice,
      },
    ]);
    console.log(this.chosenSeats$$.value);
  }

  getSeats() {
    return this.chosenSeats$$.value;
  }
}
