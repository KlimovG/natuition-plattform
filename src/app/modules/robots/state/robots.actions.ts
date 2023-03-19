import { Action } from '@ngrx/store';
import { RobotModel } from '../models/robot.model';

export enum RobotsActionTypes {
  GET_ROBOTS_CUSTOMER = '[Robots] Get robots for customer',
  GET_ROBOTS_CUSTOMER_SUCCESS = '[Robots] Get robots for customer success',
  SET_ACTIVE_ROBOT = '[Robots] Set active robot',
  UPDATE_ACTIVE_ROBOT_STATUS = '[Robots] Update status for active robot',
  UPDATE_ACTIVE_ROBOT_STATUS_SUCCESS = '[Robots] Update status for active robot success',
  UPDATE_STATUSES_FOR_ALL_ROBOTS = '[Robots] Update status for all robots',
  UPDATE_STATUSES_FOR_ALL_ROBOTS_SUCCESS = '[Robots] Update status for all robots success',
}

export class GetRobotsForCustomer implements Action {
  readonly type = RobotsActionTypes.GET_ROBOTS_CUSTOMER;
}

export class GetRobotsForCustomerSuccess implements Action {
  readonly type = RobotsActionTypes.GET_ROBOTS_CUSTOMER_SUCCESS;

  constructor(public payload: RobotModel[]) {}
}

export class SetActiveRobot implements Action {
  readonly type = RobotsActionTypes.SET_ACTIVE_ROBOT;

  constructor(public payload: RobotModel) {}
}

export class UpdateStatusForActiveRobot implements Action {
  readonly type = RobotsActionTypes.UPDATE_ACTIVE_ROBOT_STATUS;

  constructor(public payload: RobotModel) {}
}

export class UpdateStatusForActiveRobotSuccess implements Action {
  readonly type = RobotsActionTypes.UPDATE_ACTIVE_ROBOT_STATUS_SUCCESS;

  constructor(public payload: RobotModel) {}
}
export class UpdateStatusForAllRobots implements Action {
  readonly type = RobotsActionTypes.UPDATE_STATUSES_FOR_ALL_ROBOTS;
}

export class UpdateStatusForAllRobotsSuccess implements Action {
  readonly type = RobotsActionTypes.UPDATE_STATUSES_FOR_ALL_ROBOTS_SUCCESS;

  constructor(public payload: RobotModel[]) {}
}

export type RobotsActionUnion =
  | UpdateStatusForAllRobots
  | UpdateStatusForAllRobotsSuccess
  | UpdateStatusForActiveRobotSuccess
  | UpdateStatusForActiveRobot
  | SetActiveRobot
  | GetRobotsForCustomer
  | GetRobotsForCustomerSuccess;
