import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { LoginInput } from '../models/login-form.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { SignInOutputDto } from '../dto/sign-in-output.dto';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenStorageService,
    protected router: Router,
    private cookieService: CookieService
  ) {}
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  isAuthenticated(): Observable<SignInOutputDto> {
    return this.httpClient
      .get<SignInOutputDto>('/api/auth/authenticate', {
        withCredentials: true,
        observe: 'response',
        headers: this.headers,
      })
      .pipe(
        map((response) => {
          this.tokenService.accessToken = this.cookieService.get('accessToken');
          this.tokenService.refreshToken =
            this.cookieService.get('refreshToken');
          return response.body;
        }),
        catchError((err) => {
          this.router.navigate(['/login']);
          return of(err);
        })
      );
  }

  login(data: LoginInput): Observable<SignInOutputDto> {
    return this.httpClient
      .post<SignInOutputDto>('/api/auth/login', data, {
        withCredentials: true,
        observe: 'response',
        headers: this.headers,
      })
      .pipe(
        map((response) => {
          this.tokenService.accessToken = this.cookieService.get('accessToken');
          this.tokenService.refreshToken =
            this.cookieService.get('refreshToken');

          return response.body;
        })
      );
  }

  logout(): Observable<any> {
    return this.httpClient
      .get<SignInOutputDto>('/api/auth/logout', {
        withCredentials: true,
        observe: 'response',
        headers: this.headers,
      })
      .pipe((response) => {
        // this.tokenService.removeTokens();
        return response;
      });
  }

  refreshToken(token: string) {
    return this.httpClient.post(
      '/api/auth/refresh-token',
      {
        refreshToken: token,
      },
      httpOptions
    );
  }
}
