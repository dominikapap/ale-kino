import { inject, Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DirectAccessGuard implements CanActivate {
  private router = inject(Router);

  canActivate(
    _activatedRouteSnapshot: ActivatedRouteSnapshot,
    _routerStateSnapshot: RouterStateSnapshot
  ): boolean {
    if (this.router.navigated) {
      return true;
    } else {
      this.router.navigate(['/repertoire']);
      return false;
    }
  }
}
