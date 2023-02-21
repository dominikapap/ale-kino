import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { tap, map } from 'rxjs';
import { UserStateService } from '../auth';

export const adminGuard: CanActivateFn = () => {
  const userStateService = inject(UserStateService);
  const router = inject(Router);

  return userStateService.user$.pipe(
    tap((user) => {
      if (user.role === 'Admin') return;
      alert('Zaloguj się jako admin aby uzyskać dostęp');
      router.navigate(['login']);
    }),
    map((user) => user.role === 'Admin')
  );
};
