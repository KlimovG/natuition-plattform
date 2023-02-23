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
export class RefreshTokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenStorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const refreshToken = this.tokenService.refreshToken;
    if (refreshToken) {
      request = request.clone({
        setHeaders: {
          refresh: `Bearer ${refreshToken}`,
        },
      });
    }
    return next.handle(request);
  }
}
