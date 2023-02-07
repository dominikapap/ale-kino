import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../cart/cart.service';
import { BookedSeatsService } from '../../shared/booked-seats.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  private builder = inject(NonNullableFormBuilder);
  private cartValue = inject(CartService).cartValue;
  private router = inject(Router);
  private bookedSeatsService = inject(BookedSeatsService);

  blikForm = this.builder.group({
    blikNum: this.builder.control(null, {
      validators: [Validators.required, Validators.pattern('[0-9]{6}')],
    }),
  });

  onSubmit() {
    this.blikForm.markAllAsTouched();
    if (this.blikForm.valid) {
      this.cartValue.forEach((ticket) => {
        this.bookedSeatsService.bookSeat(ticket);
      });
      alert('Bilety kupione');
      this.router.navigate(['']);
    } else {
      alert('Podaj kod blik');
    }
  }
}
