import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, retry } from 'rxjs';
import { API_URL } from './env.token';
import { HandleErrorService } from './handleError.service';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  private baseUrl = inject(API_URL);
  private handleErrorService = inject(HandleErrorService);
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const clone = request.clone({
      url: `${this.baseUrl}${request.url}`,
    });

    return next.handle(clone).pipe(
      retry(1),
      catchError((error) => this.handleErrorService.handleError(error))
    );
  }
}
