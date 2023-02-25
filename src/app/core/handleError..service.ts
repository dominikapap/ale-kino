import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { SnackBarService } from '../shared/services/snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class HandleErrorService {
  private router = inject(Router);
  private snackBarService = inject(SnackBarService);

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      this.snackBarService.openSnackBar(
        'Wystąpił  błąd typu:' +
          error.message +
          '. Nie udało się połączyć z serwerem, spróbuj ponownie póżniej',
        0,
        ['red-snackbar']
      );
    } else {
      this.snackBarService.openSnackBar(
        'Wystąpił błąd: ' +
          error.status +
          'treść komunikatu: ' +
          error.message +
          '. Spróbuj ponownie później',
        0,
        ['red-snackbar']
      );
    }
    return throwError(
      () => new Error('Coś poszło nie tak, spróbuj ponownie później')
    );
  }
}
