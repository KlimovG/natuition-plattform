import { Action } from '@ngrx/store';
import { SessionModel } from '../models/session.model';

export enum SessionsActionTypes {
  GET_SESSIONS_ROBOT = '[Sessions] Get sessions for customer',
  GET_MORE_SESSIONS_FOR_ROBOT = '[Sessions] Get 10 more sessions for customer',
  GET_SESSIONS_ROBOT_SUCCESS = '[Sessions] Get sessions for customer success',
  GET_MORE_SESSIONS_FOR_ROBOT_SUCCESS = '[Sessions] Get 10 more sessions for customer success',
  SET_ACTIVE_SESSION = '[Sessions] Set active session',
}

export class GetSessionsForRobot implements Action {
  readonly type = SessionsActionTypes.GET_SESSIONS_ROBOT;

  constructor(public payload: string) {}
}

export class GetMoreSessionsForRobot implements Action {
  readonly type = SessionsActionTypes.GET_MORE_SESSIONS_FOR_ROBOT;

  constructor(public payload: { serialId: number; serial: string }) {}
}

export class GetSessionsForRobotSuccess implements Action {
  readonly type = SessionsActionTypes.GET_SESSIONS_ROBOT_SUCCESS;

  constructor(public payload: SessionModel[]) {}
}

export class GetMoreSessionsForRobotSuccess implements Action {
  readonly type = SessionsActionTypes.GET_MORE_SESSIONS_FOR_ROBOT_SUCCESS;

  constructor(public payload: SessionModel[]) {}
}

export class SetActiveSession implements Action {
  readonly type = SessionsActionTypes.SET_ACTIVE_SESSION;

  constructor(public payload: string) {}
}

export type SessionsActionUnion =
  | SetActiveSession
  | GetSessionsForRobot
  | GetMoreSessionsForRobot
  | GetMoreSessionsForRobotSuccess
  | GetSessionsForRobotSuccess;
