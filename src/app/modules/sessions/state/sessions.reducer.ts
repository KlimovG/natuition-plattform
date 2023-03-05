import { SessionModel } from '../models/session.model';
import { SessionsActionTypes, SessionsActionUnion } from './sessions.actions';
import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';

export interface SesssionsState {
  sessions: SessionModel[];
  isLoading: boolean;
  activeSession: number;
}

export const initialState: SesssionsState = {
  sessions: [],
  isLoading: false,
  activeSession: null,
};

export function reducer(
  state = initialState,
  action: SessionsActionUnion
): SesssionsState {
  switch (action.type) {
    case SessionsActionTypes.GET_SESSIONS_ROBOT:
      return {
        ...state,
        isLoading: true,
      };
    case SessionsActionTypes.GET_SESSIONS_ROBOT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sessions: action.payload,
      };
    case SessionsActionTypes.GET_MORE_SESSIONS_FOR_ROBOT:
      return {
        ...state,
        isLoading: true,
      };
    case SessionsActionTypes.GET_MORE_SESSIONS_FOR_ROBOT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        // sessions: action.payload,
        sessions: [...state.sessions, ...action.payload],
      };
    case SessionsActionTypes.SET_ACTIVE_SESSION:
      return {
        ...state,
        activeSession: action.payload,
      };
    default:
      return state;
  }
}

const selectFeature = createFeatureSelector<SesssionsState>('sessions');

export const selectSessions = (): MemoizedSelector<any, SessionModel[]> =>
  createSelector(selectFeature, (state) => state.sessions);

export const selectActiveSession = (): MemoizedSelector<any, number> =>
  createSelector(selectFeature, (state) => state.activeSession);

export const isRobotSessionsLoading = (): MemoizedSelector<any, boolean> =>
  createSelector(selectFeature, (state) => state.isLoading);
