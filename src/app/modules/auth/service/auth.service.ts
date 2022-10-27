import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject, tap } from 'rxjs';
import { LoginInput } from '../models/login-form.model';
import { GraphQLService } from '../../../shared/modules/graphQL/graphQL.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authenticated = new Subject<boolean>();

  constructor(
    private graphQlService: GraphQLService,
    private httpClient: HttpClient
  ) {}

  isAuthenticated(): Observable<boolean> {
    return this.httpClient.get<boolean>('api/auth').pipe(
      tap((value) => {
        console.log(value);
        this.authenticated.next(true);
      }),
      catchError(() => of(false))
    );
  }

  login(data: LoginInput): Observable<User> {
    return this.httpClient.post<User>('api/auth/login', data);
  }
  refreshToken(token: string) {
    return this.httpClient.post(
      'api/auth/refresh-token',
      {
        refreshToken: token,
      },
      httpOptions
    );
  }
}
