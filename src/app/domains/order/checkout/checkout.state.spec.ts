import { EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CheckoutStateService } from './checkout.state.service';
describe('CheckoutStateService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [CheckoutStateService],
    });
  });

  it('emits value after setCheckoutState is called', (done) => {
    const stateService =
      TestBed.inject(EnvironmentInjector).get(CheckoutStateService);
    const testData = {
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: 1234567890,
      email: 'johndoe@example.com',
      newsletter: false,
    };

    stateService.setCheckoutState({
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: 1234567890,
      email: 'johndoe@example.com',
      newsletter: false,
    });

    stateService.checkout$.subscribe((checkoutInfo) => {
      expect(checkoutInfo).toEqual(testData);
      done();
    });
  });

  it('clears state', (done) => {
    const stateService =
      TestBed.inject(EnvironmentInjector).get(CheckoutStateService);
    const testData = {
      email: '',
      firstName: '',
      lastName: '',
      newsletter: false,
      phoneNumber: 0,
    };
    stateService.clearCheckoutState();

    stateService.checkout$.subscribe((checkoutInfo) => {
      expect(checkoutInfo).toEqual(testData);
      done();
    });
  });
});
