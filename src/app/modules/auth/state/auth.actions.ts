import { Action } from '@ngrx/store';
import { LoginInput } from '../models/login-form.model';
import { SignInOutputDto } from '../dto/sign-in-output.dto';

export enum AuthActionTypes {
  AUTHENTICATE = '[Auth] Authentication',
  REFRESH_ACCESS_TOKEN = '[Auth] Refresh access token',
  AUTHENTICATE_SUCCESS = '[Auth] Authentication success',
  AUTHENTICATE_FAILURE = '[Auth] Authentication failed',
  FIRST_AUTHENTICATE = '[Auth] Initial Authentication',
  FIRST_AUTHENTICATE_SUCCESS = '[Auth] Initial Authentication success',
  FIRST_AUTHENTICATE_FAILURE = '[Auth] Initial Authentication failed',
  LOG_IN = '[Auth] Logging in',
  LOG_IN_SUCCESS = '[Auth] Login is successful',
  LOG_IN_FAILURE = '[Auth] Login is failed',
  LOG_OUT = '[Auth] Logout',
  LOG_OUT_SUCCESS = '[Auth] Logout is successful',
  LOG_OUT_FAILURE = '[Auth] Login is failed',
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

export class FirstAuthentication implements Action {
  readonly type = AuthActionTypes.FIRST_AUTHENTICATE;
}

export class FirstAuthenticationSuccess implements Action {
  readonly type = AuthActionTypes.FIRST_AUTHENTICATE_SUCCESS;

  constructor(public payload: SignInOutputDto) {}
}

export class FirstAuthenticationFailure implements Action {
  readonly type = AuthActionTypes.FIRST_AUTHENTICATE_FAILURE;
}

export class LogIn implements Action {
  readonly type = AuthActionTypes.LOG_IN;

  constructor(public payload: LoginInput) {}
}

export class LogOut implements Action {
  readonly type = AuthActionTypes.LOG_OUT;
}

export class LogOutSuccess implements Action {
  readonly type = AuthActionTypes.LOG_OUT_SUCCESS;
}

export class LogOutFailure implements Action {
  readonly type = AuthActionTypes.LOG_OUT_FAILURE;
}

export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOG_IN_SUCCESS;

  constructor(public payload: SignInOutputDto) {}
}

export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOG_IN_FAILURE;

  constructor(public payload: any) {}
}

export type AuthActionUnion =
  | LogOutSuccess
  | LogOutFailure
  | LogIn
  | RefreshAccess
  | LogOut
  | AuthenticateFailure
  | LogInSuccess
  | FirstAuthentication
  | FirstAuthenticationSuccess
  | FirstAuthenticationFailure
  | LogInFailure
  | Authenticate
  | AuthenticateSuccess;
