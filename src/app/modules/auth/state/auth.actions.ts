import { Action } from '@ngrx/store';
import { LoginFormOutput } from '../models/login-form.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthState } from './auth.reducer';

export enum AuthActionTypes {
  LOG_IN = '[Auth] Logging in',
  LOG_IN_SUCCESS = '[Auth] Login is successful',
  LOG_IN_FAILURE = '[Auth] Login is failed',
}

export class LogIn implements Action {
  readonly type = AuthActionTypes.LOG_IN;

  constructor(public payload: LoginFormOutput) {}
}

export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOG_IN_SUCCESS;

  constructor(public payload: AuthState) {}
}

export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOG_IN_FAILURE;

  constructor(public payload: HttpErrorResponse) {}
}

export type AuthActionUnion = LogIn | LogInSuccess | LogInFailure;
