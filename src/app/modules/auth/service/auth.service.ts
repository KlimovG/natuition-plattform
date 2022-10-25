import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { LoginInput } from '../models/login-form.model';
import { GraphQLService } from '../../../shared/modules/graphQL/graphQL.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private graphQlService: GraphQLService,
    private httpClient: HttpClient
  ) {}

  isAuthenticated(): Observable<boolean> {
    return this.httpClient
      .get<boolean>('/api/auth')
      .pipe(catchError(() => of(false)));
  }

  login(data: LoginInput): Observable<User> {
    return this.httpClient.post<User>('api/auth/login', data);
  }
}
