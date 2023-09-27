import { Action } from '@ngrx/store';
import { RobotModel } from '../models/robot.model';

export enum RobotsActionTypes {
  GET_ROBOTS_CUSTOMER = '[Robots] Get robots for customer',
  GET_ROBOTS_CUSTOMER_SUCCESS = '[Robots] Get robots for customer success',
  SET_ACTIVE_ROBOT = '[Robots] Set active robot',
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

export type RobotsActionUnion =
  | SetActiveRobot
  | GetRobotsForCustomer
  | GetRobotsForCustomerSuccess;
