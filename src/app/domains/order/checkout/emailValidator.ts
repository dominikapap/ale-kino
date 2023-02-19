import { AbstractControl } from '@angular/forms';

export function emailValidator() {
  return (control: AbstractControl): { emailPattern: true } | null => {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const regex = new RegExp(emailRegex);
    if (regex.test(control.value)) {
      return null;
    }
    return { emailPattern: true };
  };
}
