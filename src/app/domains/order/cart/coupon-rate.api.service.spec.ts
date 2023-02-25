import { HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CouponRateApiService } from './coupon-rate.api.service';
import { Coupon } from './coupon-rate.state.service';

describe('CouponRateApiService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [CouponRateApiService],
      imports: [HttpClientTestingModule],
    });
  });

  it('get record with provided coupon code', (done) => {
    const expectedUrl = `/coupons?code=kodTestowy`;
    const service =
      TestBed.inject(EnvironmentInjector).get(CouponRateApiService);
    const httpController = TestBed.inject(HttpTestingController);

    service.getCouponByName('kodTestowy').subscribe({
      next: (res: Coupon[]) => {
        expect(res).toEqual([
          {
            id: 1,
            code: 'kodTestowy',
            couponRate: 0.8,
            wasUsed: true,
          },
        ]);
        done();
      },
      error: (err: HttpErrorResponse) => {
        expect(err.statusText).toEqual('Error');
        done();
      },
    });

    const req = httpController.expectOne({ method: 'GET', url: expectedUrl });

    req.flush([
      {
        id: 1,
        code: 'kodTestowy',
        couponRate: 0.8,
        wasUsed: true,
      },
    ]);
  });

  it('patches value of wasUsed in record with provided coupon code', (done) => {
    const expectedUrl = `/coupons/2`;
    const service =
      TestBed.inject(EnvironmentInjector).get(CouponRateApiService);
    const httpController = TestBed.inject(HttpTestingController);

    service.patch(2).subscribe({
      next: (res: Coupon) => {
        expect(res).toEqual({
          id: 2,
          code: 'aleOkazja',
          couponRate: 0.75,
          wasUsed: true,
        });
        done();
      },
      error: (err: HttpErrorResponse) => {
        expect(err.statusText).toEqual('Error');
        done();
      },
    });

    const req = httpController.expectOne({
      method: 'PATCH',
      url: expectedUrl,
    });

    req.flush({
      id: 2,
      code: 'aleOkazja',
      couponRate: 0.75,
      wasUsed: true,
    });
  });
});
