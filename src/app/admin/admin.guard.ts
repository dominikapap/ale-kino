import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { tap, map } from 'rxjs';
import { UserStateService } from '../auth';
import { SnackBarService } from '../shared/services/snack-bar.service';

export const adminGuard: CanActivateFn = () => {
  const userStateService = inject(UserStateService);
  const snackBarService = inject(SnackBarService);
  const router = inject(Router);

  return userStateService.user$.pipe(
    tap((user) => {
      if (user.role === 'Admin') return;
      snackBarService.openSnackBar(
        'Zaloguj się jako admin aby uzyskać dostęp',
        3000
      );
      router.navigate(['login']);
    }),
    map((user) => user.role === 'Admin')
  );
};
