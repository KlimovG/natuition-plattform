import { Action } from '@ngrx/store';
import { RobotModel } from '../models/robot.model';

export enum RobotsActionTypes {
  GET_ROBOTS_CUSTOMER = '[Robots] Get robots for customer',
  GET_ROBOTS_CUSTOMER_SUCCESS = '[Robots] Get robots for customer success',
}

export class GetRobotsForCustomer implements Action {
  readonly type = RobotsActionTypes.GET_ROBOTS_CUSTOMER;

  constructor(public payload: number) {}
}

export class GetRobotsForCustomerSuccess implements Action {
  readonly type = RobotsActionTypes.GET_ROBOTS_CUSTOMER_SUCCESS;

  constructor(public payload: RobotModel[]) {}
}

export type RobotsActionUnion =
  | GetRobotsForCustomer
  | GetRobotsForCustomerSuccess;
