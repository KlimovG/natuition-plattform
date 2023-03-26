import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../service/auth.service';
import {
  AuthActionTypes,
  Authenticate,
  AuthenticateFailure,
  LogIn,
  LogInFailure,
  LogInSuccess,
  LogOut,
} from './auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private service: AuthService,
    protected router: Router
  ) {}

  auth$ = createEffect(() =>
    this.actions$.pipe(
      ofType<Authenticate>(AuthActionTypes.AUTHENTICATE),
      switchMap(() =>
        this.service.isAuthenticated().pipe(
          map((data) => {
            if (!data?.id) return new AuthenticateFailure();

            return new LogInSuccess({
              id: data.id,
              name: data.name,
            });
          })
        )
      )
    )
  );

  redirectToLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<AuthenticateFailure>(AuthActionTypes.AUTHENTICATE_FAILURE),
        tap(() => {
          return this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType<LogIn>(AuthActionTypes.LOG_IN),
      switchMap(({ payload }) =>
        this.service.login(payload).pipe(
          map((response) => {
            return new LogInSuccess({
              id: response.id,
              name: response.name,
            });
          }),
          catchError((error) => of(new LogInFailure({ error })))
        )
      )
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<LogOut>(AuthActionTypes.LOG_OUT),
        switchMap(() => {
          return this.service.logout().pipe(
            map(() => {
              this.router.navigate(['login']);
              location.reload();
            })
          );
        })
      ),
    { dispatch: false }
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<LogInSuccess>(AuthActionTypes.LOG_IN_SUCCESS),
        tap(async () => {
          await this.router.navigate(['dashboard']);
        })
      ),
    { dispatch: false }
  );
}
