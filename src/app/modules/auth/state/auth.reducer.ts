import { AuthActionTypes, AuthActionUnion } from './auth.actions';
import { User } from '../models/user.model';
import { State } from '../../../state';

export interface AuthState {
  isLogged: boolean;
  user: User;
}

export const initialState: AuthState = {
  isLogged: false,
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
        isLogged: false,
        user: null,
      };
    case AuthActionTypes.AUTHENTICATE_FAILURE:
      return {
        isLogged: false,
        user: null,
      };
    case AuthActionTypes.AUTHENTICATE_SUCCESS:
      return {
        ...state,
        isLogged: true,
      };
    case AuthActionTypes.LOG_IN_SUCCESS:
      return {
        user: action.payload.user,
        isLogged: action.payload.isLogged,
      };
    default:
      return state;
  }
}

export const selectUserID = (state: State): number => state.auth?.user?.id;
export const isLogged = (state: State): boolean => state.auth?.isLogged;
export const getUserName = (state: State): string => state.auth?.user?.name;
