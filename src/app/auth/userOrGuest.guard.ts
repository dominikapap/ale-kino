import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { tap, map } from 'rxjs';
import { SnackBarService } from '../shared/services/snack-bar.service';
import { UserStateService } from './user.state.service';

export const userOrGuestGuard: CanActivateFn = () => {
  const userStateService = inject(UserStateService);
  const snackBarService = inject(SnackBarService);
  const router = inject(Router);

  return userStateService.user$.pipe(
    tap((user) => {
      if (user.role === 'User' || user.role === 'Guest') return;
      snackBarService.openSnackBar(
        'wyloguj się z konta admina aby uzyskać dostęp',
        3000
      );
      router.navigate(['admin']);
    }),
    map((user) => user.role === 'User' || user.role === 'Guest')
  );
};
