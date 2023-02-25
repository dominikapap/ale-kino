import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HandleErrorService {
  private router = inject(Router);

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      alert('Wystąpił  błąd typu:' + error.type);
      this.router.navigate(['/error']);
    } else {
      alert(
        'Wystąpił błąd: ' +
          error.status +
          'treść komunikatu: ' +
          error.message +
          '. Spróbuj ponownie później'
      );
      this.router.navigate(['/error']);
    }
    return throwError(
      () => new Error('Coś poszło nie tak, spróbuj ponownie później')
    );
  }
}
