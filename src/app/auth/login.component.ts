import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = this.createLoginForm();

  constructor(
    private builder: NonNullableFormBuilder,
    private auth: AuthService
  ) {}

  // login() {
  //   this.authStateService
  //     .login(this.loginForm.getRawValue())
  //     .subscribe(console.log);
  // }

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
            this.auth.authorize(results[0].id, results[0].firstName);
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
