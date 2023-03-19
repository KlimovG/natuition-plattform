import { RobotModel, RobotStatus } from '../models/robot.model';
import { RobotsActionTypes, RobotsActionUnion } from './robots.actions';
import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';

export interface RobotsState {
  robotsForCustomer: RobotModel[];
  isLoading: boolean;
  activeRobot: RobotModel;
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
    case RobotsActionTypes.UPDATE_STATUSES_FOR_ALL_ROBOTS_SUCCESS:
      return {
        ...state,
        robotsForCustomer: action.payload,
      };
    case RobotsActionTypes.UPDATE_ACTIVE_ROBOT_STATUS_SUCCESS:
      return {
        ...state,
        activeRobot: {
          ...state.activeRobot,
          status: action.payload.status,
        },
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

export const selectActiveRobotStatus = (): MemoizedSelector<any, RobotStatus> =>
  createSelector(selectFeature, (state) => state.activeRobot?.status);

export const selectActiveRobotSerial = (): MemoizedSelector<any, string> =>
  createSelector(selectFeature, (state) => state.activeRobot?.serial);

export const isRobotListLoading = (): MemoizedSelector<any, boolean> =>
  createSelector(selectFeature, (state) => state.isLoading);
