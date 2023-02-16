import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatesService {
  getCurrentWeek() {
    const curr = new Date();
    const week = [];

    for (let i = 1; i <= 7; i++) {
      const first = curr.getDate() - curr.getDay() + i;
      const day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
      week.push(day);
    }
    return week;
  }
  getCurrentDay() {
    const curr = new Date();
    return curr.toISOString().slice(0, 10);
  }

  // checkIfHourPassed(hour: string) {
  //   const now = new Date();
  //   if (parseInt(hour.split(':')[0]) < now.getHours()) {
  //     return false;
  //   } else if (parseInt(hour.split(':')[0]) == now.getHours()) {
  //     if (parseInt(hour.split(':')[1]) > now.getMinutes()) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } else {
  //     return true;
  //   }
  // }
}
