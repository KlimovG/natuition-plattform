import { Action } from '@ngrx/store';
import { RobotModel } from '../models/robot.model';

export enum RobotsActionTypes {
  UPDATE_ROBOT_STATUS = '[Robots] Update robot status',
  UPDATE_ROBOT_STATUS_RESPONSE = '[Robots] Update robot status: response',
  GET_ROBOTS_CUSTOMER = '[Robots] Get robots for customer',
  GET_ROBOTS_CUSTOMER_SUCCESS = '[Robots] Get robots for customer success',
  SET_ACTIVE_ROBOT = '[Robots] Set active robot',
}

export class UpdateRobotStatus implements Action {
  readonly type = RobotsActionTypes.UPDATE_ROBOT_STATUS;
}

export class UpdateRobotStatusResponse implements Action {
  readonly type = RobotsActionTypes.UPDATE_ROBOT_STATUS_RESPONSE;

  constructor(public payload: number) {}
}

export class GetRobotsForCustomer implements Action {
  readonly type = RobotsActionTypes.GET_ROBOTS_CUSTOMER;

  constructor(public payload: number) {}
}

export class GetRobotsForCustomerSuccess implements Action {
  readonly type = RobotsActionTypes.GET_ROBOTS_CUSTOMER_SUCCESS;

  constructor(public payload: RobotModel[]) {}
}

export class SetActiveRobot implements Action {
  readonly type = RobotsActionTypes.SET_ACTIVE_ROBOT;

  constructor(public payload: string) {}
}

export type RobotsActionUnion =
  | UpdateRobotStatus
  | UpdateRobotStatusResponse
  | SetActiveRobot
  | GetRobotsForCustomer
  | GetRobotsForCustomerSuccess;
