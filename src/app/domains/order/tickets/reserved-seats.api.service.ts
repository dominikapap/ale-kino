import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface ReservedSeat {
  id: string;
  rowSeat: string;
  columnSeat: number;
  showingID: number;
  userID: number;
}

@Injectable({
  providedIn: 'root',
})
export class ReservedSeatsApiService {
  private http = inject(HttpClient);

  getByShowing(showingId: number) {
    return this.http.get<ReservedSeat[]>(
      `/reservedSeats?showingID=${showingId}`
    );
  }

  reserveSeat(
    rowSeat: string,
    columnSeat: number,
    userID: number,
    showingID: number
  ) {
    return this.http.post<ReservedSeat>('/reservedSeats', {
      rowSeat,
      columnSeat,
      showingID,
      userID,
      id: showingID + rowSeat + columnSeat,
    });
  }

  removeSeat(seatID: string) {
    return this.http.delete<ReservedSeat>(`/reservedSeats/${seatID}`);
  }
}
