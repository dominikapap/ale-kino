import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { AuthStateService } from '../auth.state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private builder = inject(NonNullableFormBuilder);
  private auth = inject(AuthStateService);
  private snackBarService = inject(SnackBarService);
  loginForm = this.createLoginForm();

  sendForm() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      this.snackBarService.openSnackBar('Nie wypełniono formularza', 3000);
    }
    this.auth.checkCredentials(
      this.loginForm.controls.email.value,
      this.loginForm.controls.password.value
    );
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
