import { Action } from '@ngrx/store';
import { LoginInput } from '../models/login-form.model';
import { AuthState } from './auth.reducer';

export enum AuthActionTypes {
  AUTHENTICATE = '[Auth] Authentication',
  REFRESH_ACCESS_TOKEN = '[Auth] Refresh access token',
  AUTHENTICATE_SUCCESS = '[Auth] Authentication success',
  AUTHENTICATE_FAILURE = '[Auth] Authentication failed',
  LOG_IN = '[Auth] Logging in',
  LOG_IN_SUCCESS = '[Auth] Login is successful',
  LOG_IN_FAILURE = '[Auth] Login is failed',
  LOG_OUT = '[Auth] Logout',
}

export class Authenticate implements Action {
  readonly type = AuthActionTypes.AUTHENTICATE;
}

export class RefreshAccess implements Action {
  readonly type = AuthActionTypes.REFRESH_ACCESS_TOKEN;
}

export class AuthenticateSuccess implements Action {
  readonly type = AuthActionTypes.AUTHENTICATE_SUCCESS;

  constructor(public payload: boolean) {}
}

export class AuthenticateFailure implements Action {
  readonly type = AuthActionTypes.AUTHENTICATE_FAILURE;
}

export class LogIn implements Action {
  readonly type = AuthActionTypes.LOG_IN;

  constructor(public payload: LoginInput) {}
}

export class LogOut implements Action {
  readonly type = AuthActionTypes.LOG_OUT;
}

export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOG_IN_SUCCESS;

  constructor(public payload: AuthState) {}
}

export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOG_IN_FAILURE;

  constructor(public payload: any) {}
}

export type AuthActionUnion =
  | LogIn
  | RefreshAccess
  | LogOut
  | AuthenticateFailure
  | LogInSuccess
  | LogInFailure
  | Authenticate
  | AuthenticateSuccess;
