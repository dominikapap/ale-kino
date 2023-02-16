import { AbstractControl } from '@angular/forms';

export function emailValidator() {
  return (control: AbstractControl): { email: true }| null => {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const email = control.value;
    return emailRegex.test(email) ? null : { email: true };
  };
}
