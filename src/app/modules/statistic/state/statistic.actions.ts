import { Action } from '@ngrx/store';
import { StatisticModel } from '../models/statistic.model';

export enum SessionsActionTypes {
  GET_SESSIONS_ROBOT = '[Sessions] Get sessions for customer',
  GET_SESSIONS_ROBOT_SUCCESS = '[Sessions] Get sessions for customer success',
  SET_ACTIVE_SESSION = '[Sessions] Set active session',
}

export class GetSessionsForRobot implements Action {
  readonly type = SessionsActionTypes.GET_SESSIONS_ROBOT;

  constructor(public payload: string) {}
}

export class GetSessionsForRobotSuccess implements Action {
  readonly type = SessionsActionTypes.GET_SESSIONS_ROBOT_SUCCESS;

  constructor(public payload: StatisticModel[]) {}
}

export class SetActiveSession implements Action {
  readonly type = SessionsActionTypes.SET_ACTIVE_SESSION;

  constructor(public payload: string) {}
}

export type SessionsActionUnion =
  | SetActiveSession
  | GetSessionsForRobot
  | GetSessionsForRobotSuccess;
