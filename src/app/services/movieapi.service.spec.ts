import { TestBed } from '@angular/core/testing';

import { MovieApiService } from './movieapi.service';

describe('MovieApiService', () => {
  let service: MovieApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
