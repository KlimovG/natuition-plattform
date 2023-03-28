import { AuthActionTypes, AuthActionUnion } from './auth.actions';
import { User } from '../models/user.model';
import { State } from '../../../state';

export interface AuthState {
  isLogged: boolean;
  isLoading: boolean;
  user: User;
}

export const initialState: AuthState = {
  isLogged: false,
  isLoading: false,
  user: {
    id: 1,
    name: 'v.modylevskii@natuition.com',
  },
};

export function reducer(
  state = initialState,
  action: AuthActionUnion
): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOG_OUT:
      return {
        ...state,
        isLoading: true,
      };
    case AuthActionTypes.LOG_OUT_SUCCESS:
      return {
        isLogged: false,
        user: null,
        isLoading: false,
      };
    case AuthActionTypes.LOG_OUT_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case AuthActionTypes.AUTHENTICATE_FAILURE:
      return {
        isLogged: false,
        user: null,
        isLoading: false,
      };
    case AuthActionTypes.AUTHENTICATE_SUCCESS:
      return {
        ...state,
        isLogged: true,
        isLoading: false,
      };
    case AuthActionTypes.LOG_IN_SUCCESS:
      return {
        user: action.payload,
        isLogged: true,
        isLoading: false,
      };
    case AuthActionTypes.LOG_IN:
      return {
        ...state,
        isLoading: true,
      };
    case AuthActionTypes.AUTHENTICATE:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}

export const selectUserID = (state: State): number => state.auth?.user?.id;
export const isLogged = (state: State): boolean => state.auth?.isLogged;
export const isLoadingUserAuth = (state: State): boolean =>
  state.auth?.isLoading;
export const getUserName = (state: State): string => state.auth?.user?.name;
