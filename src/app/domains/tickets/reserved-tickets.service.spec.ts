import { TestBed } from '@angular/core/testing';

import { ReservedSeatsService } from './reserved-seats.service';

describe('ReservedTicketsService', () => {
  let service: ReservedSeatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservedSeatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
