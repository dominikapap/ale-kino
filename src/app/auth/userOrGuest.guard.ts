import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { tap, map } from 'rxjs';
import { UserStateService } from './user.state.service';

export const userOrGuestGuard: CanActivateFn = () => {
  const userStateService = inject(UserStateService);
  const router = inject(Router);

  return userStateService.user$.pipe(
    tap((user) => {
      if (user.role === 'User' || user.role === 'Guest') return;
      alert('wyloguj się z konta admina aby uzyskać dostęp');
      router.navigate(['admin']);
    }),
    map((user) => user.role === 'User' || user.role === 'Guest')
  );
};
