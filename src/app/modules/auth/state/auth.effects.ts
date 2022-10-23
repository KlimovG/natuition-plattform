import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../service/auth.service';
import { AuthActionTypes, LogIn, LogInSuccess } from './auth.actions';
import { switchMap, tap } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private service: AuthService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType<LogIn>(AuthActionTypes.LOG_IN),
      tap((value) => console.log(value)),
      switchMap(({ payload }) =>
        this.service
          .logIn(payload)
          .then((data) => new LogInSuccess({ isLogged: true, user: data }))
      )
    )
  );
}
