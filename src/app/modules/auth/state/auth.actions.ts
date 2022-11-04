import { Action } from '@ngrx/store';
import { LoginInput } from '../models/login-form.model';
import { AuthState } from './auth.reducer';

export enum AuthActionTypes {
  LOG_IN = '[Auth] Logging in',
  LOG_IN_SUCCESS = '[Auth] Login is successful',
  LOG_IN_FAILURE = '[Auth] Login is failed',
}

export class LogIn implements Action {
  readonly type = AuthActionTypes.LOG_IN;

  constructor(public payload: LoginInput) {}
}

export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOG_IN_SUCCESS;

  constructor(public payload: AuthState) {}
}

export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOG_IN_FAILURE;

  constructor(public payload: any) {}
}

export type AuthActionUnion = LogIn | LogInSuccess | LogInFailure;
