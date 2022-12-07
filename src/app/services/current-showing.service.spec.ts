import { TestBed } from '@angular/core/testing';

import { CurrentShowingService } from './current-showing.service';

describe('CurrentShowingService', () => {
  let service: CurrentShowingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentShowingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
