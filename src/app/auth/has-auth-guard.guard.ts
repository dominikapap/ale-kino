import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { tap, map } from 'rxjs';
import { SnackBarService } from '../shared/services/snack-bar.service';
import { AuthStateService } from './auth.state.service';

export const hasAuthGuard: CanActivateFn = () => {
  const authStateService = inject(AuthStateService);
  const snackBarService = inject(SnackBarService);
  const router = inject(Router);

  return authStateService.auth$.pipe(
    tap((authState) => {
      if (authState.hasAuth) return;

      router.navigate(['logowanie']);
      snackBarService.openSnackBar('Zaloguj się aby uzyskać dostęp', 3000);
    }),
    map((authState) => authState.hasAuth)
  );
};
