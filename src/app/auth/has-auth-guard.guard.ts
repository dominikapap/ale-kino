import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { tap, map } from 'rxjs';
import { AuthStateService } from './auth.state.service';

export const hasAuthGuard: CanActivateFn = () => {
  const authStateService = inject(AuthStateService);
  const router = inject(Router);

  return authStateService.auth$.pipe(
    tap((authState) => {
      if (authState.hasAuth) return;

      router.navigate(['logowanie']);
      alert('Zaloguj się aby uzyskać dostęp');
    }),
    map((authState) => authState.hasAuth)
  );
};
