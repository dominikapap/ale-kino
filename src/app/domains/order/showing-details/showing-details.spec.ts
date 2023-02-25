import { HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ShowingDetailsApiService } from './showing-details.api.service';

describe('ShowingDetailsApiService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ShowingDetailsApiService],
      imports: [HttpClientTestingModule],
    });
  });

  it('get showing details', (done) => {
    const expectedUrl = '/showings?id=1';
    const service = TestBed.inject(EnvironmentInjector).get(
      ShowingDetailsApiService
    );
    const httpController = TestBed.inject(HttpTestingController);

    service.getShowingDetails(1).subscribe({
      next: (res) => {
        expect(res).toEqual({
          movieId: '5633922',
          movieTitle: 'Władca Pierścieni: Drużyna Pierścienia',
          date: '2023-02-27',
          break: 15,
          timeFrom: '15:00',
          timeTo: '19:00',
          hallAvailableAfter: '19:15',
          hallId: 2,
          rows: 10,
          columns: 10,
          id: 1,
        });
        done();
      },
      error: (err: HttpErrorResponse) => {
        expect(err.statusText).not.toEqual('Error');
        done();
      },
    });

    const req = httpController.expectOne(expectedUrl);

    req.flush([
      {
        movieId: '5633922',
        movieTitle: 'Władca Pierścieni: Drużyna Pierścienia',
        date: '2023-02-27',
        break: 15,
        timeFrom: '15:00',
        timeTo: '19:00',
        hallAvailableAfter: '19:15',
        hallId: 2,
        rows: 10,
        columns: 10,
        id: 1,
      },
      {
        movieId: '1267943',
        movieTitle: 'Apokawixa',
        date: '2023-02-28',
        break: '20',
        timeFrom: '12:30',
        timeTo: '14:00',
        hallAvailableAfter: '14:20',
        hallId: 1,
        rows: 8,
        columns: 6,
        id: 5,
      },
    ]);
  });
});
