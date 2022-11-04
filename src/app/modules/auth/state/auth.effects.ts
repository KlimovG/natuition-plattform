import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../service/auth.service';
import { AuthActionTypes, LogIn, LogInSuccess } from './auth.actions';
import { map, switchMap, tap } from 'rxjs';
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
      ofType<LogIn>(AuthActionTypes.LOG_IN),
      switchMap(({ payload }) =>
        this.service.login(payload).pipe(
          map(({ email }) => {
            return new LogInSuccess({
              isLogged: true,
              user: { id: 1, email },
            });
          })
        )
      )
    )
  );

  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<LogInSuccess>(AuthActionTypes.LOG_IN_SUCCESS),
        tap(() => {
          console.log('fires');
          this.router.navigate(['dashboard']);
        })
      ),
    { dispatch: false }
  );
}
