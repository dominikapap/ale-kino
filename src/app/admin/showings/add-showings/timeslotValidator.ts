import { inject, Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { delay, EMPTY, map, Observable, of, switchMap } from 'rxjs';
import { ShowingsApiService } from '../showings-api.service';
import { ShowingForm } from './add-showing.form.service';

@Injectable({
  providedIn: 'root',
})
export class TimeslotValidator implements AsyncValidator {
  private showingsApiService = inject(ShowingsApiService);
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const form = control as ShowingForm;
    return of(EMPTY).pipe(
      delay(1000),
      switchMap(() => {
        return this.showingsApiService
          .getShowingsWithParams(form.getRawValue())
          .pipe(
            map((showing) =>
              showing.length > 0 ? { timeslotTaken: true } : null
            )
          );
      })
    );
  }
}
