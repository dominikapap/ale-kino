import { FormControl, FormGroup } from '@angular/forms';

export type CheckoutForm = FormGroup<{
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  phoneNumber: FormControl<string>;
  email: FormControl<string>;
  confirmEmail: FormControl<string>;
  newsletter: FormControl<boolean>;
  couponCode: FormControl<string>;
}>;
