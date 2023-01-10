import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { tap, map } from 'rxjs';
import { AuthService } from './auth.service';

export const hasAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.auth$.pipe(
    tap((authState) => {
      if (authState.hasAuth) return;

      router.navigate(['logowanie']);
      alert('Zaloguj się aby uzyskać dostęp');
    }),
    map((authState) => authState.hasAuth)
  );
};
