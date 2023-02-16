import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartStateService } from '../../cart/cart.state.service';
import { BookedSeatsStateService } from '../../services/booked-seats.state.service';
import { v4 as createUuidv4 } from 'uuid';
import { DatesService } from 'src/app/domains/movies/services/dates.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentComponent {
  private builder = inject(NonNullableFormBuilder);
  private cartValue = inject(CartStateService).cartValue;
  private datesService = inject(DatesService);
  private router = inject(Router);
  private bookedSeatsService = inject(BookedSeatsStateService);

  blikForm = this.builder.group({
    blikNum: this.builder.control(null, {
      validators: [Validators.required, Validators.pattern('[0-9]{6}')],
    }),
  });

  onSubmit() {
    this.blikForm.markAllAsTouched();
    if (this.blikForm.valid) {
      const orderID = createUuidv4();
      const currDay = this.datesService.getCurrentDay();
      this.cartValue.forEach((ticket) => {
        this.bookedSeatsService.bookSeat(ticket, orderID, currDay);
      });
      if (
        window.confirm(
          'Bilety kupione, czy chcesz przejść do podsumowania zamówienia?'
        )
      ) {
        this.router.navigate(['/tickets/', orderID]);
      } else {
        this.router.navigate(['/user-tickets/']);
      }
    } else {
      alert('Podaj prawidłowy kod blik');
    }
  }
}
