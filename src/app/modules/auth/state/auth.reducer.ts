import { AuthActionTypes, AuthActionUnion } from './auth.actions';
import { User } from '../models/user.model';
import { State } from '../../../state';

export interface AuthState {
  isLogged: boolean;
  isLoading: boolean;
  user: User;
  firstAuth: boolean;
}

export const initialState: AuthState = {
  isLogged: false,
  isLoading: false,
  firstAuth: true,
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
        ...state,
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
        ...state,
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
        ...state,
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
    case AuthActionTypes.FIRST_AUTHENTICATE_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLogged: true,
        isLoading: false,
        firstAuth: false,
      };
    case AuthActionTypes.FIRST_AUTHENTICATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        firstAuth: false,
        isLogged: false,
      };
    default:
      return state;
  }
}

export const selectUserID = (state: State): number => state.auth?.user?.id;
export const isLogged = (state: State): boolean => state.auth?.isLogged;
export const isLoadingUserAuth = (state: State): boolean =>
  state.auth?.isLoading;
export const isInitialAuth = (state: State): boolean => state.auth.firstAuth;
export const getUserName = (state: State): string => state.auth?.user?.name;
