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
    email: 'v.modylevskii@natuition.com',
  },
};

export function reducer(
  state = initialState,
  action: AuthActionUnion
): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOG_IN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isLogged: action.payload.isLogged,
      };
    case AuthActionTypes.LOG_IN_FAILURE:
    case AuthActionTypes.LOG_IN:
    default:
      return state;
  }
}

export const selectUserID = (state: State): number => state.auth.user.id;
