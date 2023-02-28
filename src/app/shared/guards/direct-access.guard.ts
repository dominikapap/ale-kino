import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DirectAccessGuard implements CanActivate {
  private router = inject(Router);

  canActivate(): boolean {
    if (this.router.navigated) {
      return true;
    } else {
      this.router.navigate(['/repertoire']);
      return false;
    }
  }
}
