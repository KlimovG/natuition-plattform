import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../service/auth.service';
import { AuthActionTypes, LogIn, LogInSuccess } from './auth.actions';
import { map, switchMap } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private service: AuthService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType<LogIn>(AuthActionTypes.LOG_IN),
      switchMap(({ payload }) =>
        this.service.logIn(payload).pipe(
          map(({ data }) => {
            const { id, token } = data.login;

            this.service.save(id, token);

            return new LogInSuccess({
              isLogged: true,
              user: id.toString(),
            });
          })
        )
      )
    )
  );
}
