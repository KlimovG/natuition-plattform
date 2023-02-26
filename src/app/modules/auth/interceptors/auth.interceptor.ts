import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../service/token-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenStorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const accessToken = this.tokenService.accessToken;
    const refreshToken = this.tokenService.refreshToken;

    if (
      request.url.includes('authenticate') ||
      request.url.includes('refresh')
    ) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
    } else if (accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
    return next.handle(request);
  }
}