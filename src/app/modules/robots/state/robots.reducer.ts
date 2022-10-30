import { RobotModel } from '../models/robot.model';
import { RobotsActionTypes, RobotsActionUnion } from './robots.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface RobotsState {
  robotsForCustomer: RobotModel[];
  isLoading: boolean;
}

export const initialState: RobotsState = {
  robotsForCustomer: [],
  isLoading: false,
};

export function reducer(
  state = initialState,
  action: RobotsActionUnion
): RobotsState {
  switch (action.type) {
    case RobotsActionTypes.GET_ROBOTS_CUSTOMER_SUCCESS:
      return {
        isLoading: false,
        robotsForCustomer: action.payload,
      };
    case RobotsActionTypes.GET_ROBOTS_CUSTOMER:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}

const selectFeature = createFeatureSelector<RobotsState>('robots');

export const selectRobotsForCustomer = (state: RobotsState): RobotModel[] =>
  state.robotsForCustomer;

export const selectRobots = () =>
  createSelector(selectFeature, selectRobotsForCustomer);
