import { RobotModel } from '../models/robot.model';
import { RobotsActionTypes, RobotsActionUnion } from './robots.actions';
import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';

export interface RobotsState {
  robotsForCustomer: RobotModel[];
  isLoading: boolean;
  activeRobot: string;
}

export const initialState: RobotsState = {
  robotsForCustomer: [],
  isLoading: false,
  activeRobot: null,
};

export function reducer(
  state = initialState,
  action: RobotsActionUnion
): RobotsState {
  switch (action.type) {
    case RobotsActionTypes.SET_ACTIVE_ROBOT:
      return {
        ...state,
        activeRobot: action.payload,
      };

    case RobotsActionTypes.GET_ROBOTS_CUSTOMER_SUCCESS:
      return {
        ...state,
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

export const selectRobots = (): MemoizedSelector<any, RobotModel[]> =>
  createSelector(selectFeature, (state) => state.robotsForCustomer);

export const selectActiveRobot = (): MemoizedSelector<any, string> =>
  createSelector(selectFeature, (state) => state.activeRobot);
