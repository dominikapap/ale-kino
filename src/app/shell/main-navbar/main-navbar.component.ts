import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { UserStateService } from 'src/app/auth/user.state.service';
import { AuthStateService } from '../../auth';
import { CartStateService } from '../../domains/order/cart/cart.state.service';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainNavbarComponent implements OnInit {
  private auth = inject(AuthStateService);
  private cartService = inject(CartStateService);
  private userStateService = inject(UserStateService);
  userName = inject(UserStateService).getUserName();
  userName$ = inject(UserStateService).userName$;
  userId$ = inject(UserStateService).userId$;
  userRole$ = inject(UserStateService).userRole$;
  cart$ = inject(CartStateService).cart$;
  auth$ = inject(AuthStateService).auth$;
  navbarData$ = combineLatest([
    this.userName$,
    this.userId$,
    this.userRole$,
    this.cart$,
    this.auth$,
  ]).pipe(
    map(([userName, userId, userRole, cart, auth]) => ({
      userName,
      userId,
      userRole,
      cart,
      auth,
    }))
  );

  ngOnInit() {
    const userID = this.userStateService.getUserID();
    this.cartService.getCart(userID);
  }
  onLogout() {
    this.auth.logout();
  }
}
