import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { tap, map } from 'rxjs';
import { UserStateService } from './user.state.service';

export const userGuard: CanActivateFn = () => {
  const userStateService = inject(UserStateService);
  const router = inject(Router);

  return userStateService.user$.pipe(
    tap((user) => {
      if (user.role === 'User') return;
      // alert('Zaloguj się  jako użytkownik aby uzyskać dostęp');
      router.navigate(['login']);
    }),
    map((user) => user.role === 'User')
  );
};
