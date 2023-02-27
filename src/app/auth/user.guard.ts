import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { tap, map } from 'rxjs';
import { SnackBarService } from '../shared/services/snack-bar.service';
import { UserStateService } from './user.state.service';

export const userGuard: CanActivateFn = () => {
  const userStateService = inject(UserStateService);
  const router = inject(Router);

  return userStateService.user$.pipe(
    tap((user) => {
      if (user.role === 'User') return;
      router.navigate(['login']);
    }),
    map((user) => user.role === 'User')
  );
};
