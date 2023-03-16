

export enum ModalActionTypes {
  OPEN = '[Notification] Notificationentication',
  CLOSE = '[Notification] Refresh access token',
  ADD = '[Notification] Authentication success',
}

// export class Authenticate implements Action {
//   readonly type = AuthActionTypes.AUTHENTICATE;
// }
//
// export class RefreshAccess implements Action {
//   readonly type = AuthActionTypes.REFRESH_ACCESS_TOKEN;
// }
//
// export class AuthenticateSuccess implements Action {
//   readonly type = AuthActionTypes.AUTHENTICATE_SUCCESS;
//
//   constructor(public payload: boolean) {}
// }
//
// export class AuthenticateFailure implements Action {
//   readonly type = AuthActionTypes.AUTHENTICATE_FAILURE;
// }
//
// export class LogIn implements Action {
//   readonly type = AuthActionTypes.LOG_IN;
//
//   constructor(public payload: LoginInput) {}
// }
//
// export class LogOut implements Action {
//   readonly type = AuthActionTypes.LOG_OUT;
// }
//
// export class LogInSuccess implements Action {
//   readonly type = AuthActionTypes.LOG_IN_SUCCESS;
//
//   constructor(public payload: SignInOutputDto) {}
// }
//
// export class LogInFailure implements Action {
//   readonly type = AuthActionTypes.LOG_IN_FAILURE;
//
//   constructor(public payload: any) {}
// }
//
// export type AuthActionUnion =
//   | LogIn
//   | RefreshAccess
//   | LogOut
//   | AuthenticateFailure
//   | LogInSuccess
//   | LogInFailure
//   | Authenticate
//   | AuthenticateSuccess;
