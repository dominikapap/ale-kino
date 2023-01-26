import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { CartService } from '../domains/cart/cart.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private cartService = inject(CartService);
  private builder = inject(NonNullableFormBuilder);
  private auth = inject(AuthService);
  loginForm = this.createLoginForm();

  sendForm() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      alert('Nie wypełniono formularza');
    }

    this.auth
      .checkCredentials(
        this.loginForm.controls.email.value,
        this.loginForm.controls.password.value
      )
      .subscribe({
        next: (results) => {
          if (results.length == 0) {
            alert('Błędne dane, spróbuj ponownie');
            this.loginForm.reset();
          } else {
            this.auth.authorize(results[0]);
            console.log(results[0]);
            this.cartService.getCart(results[0].userID);
          }
        },
        error: (e) => {
          console.log(e);
          alert('Coś poszło nie tak, spróbuj ponownie później');
        },
      });
  }

  private createLoginForm() {
    const form = this.builder.group({
      email: this.builder.control('', {
        validators: [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      }),
      password: this.builder.control('', {
        validators: [Validators.required, Validators.minLength(8)],
      }),
    });
    return form;
  }
}
