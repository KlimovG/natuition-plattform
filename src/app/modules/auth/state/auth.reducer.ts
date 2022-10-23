import { AuthActionTypes, AuthActionUnion } from './auth.actions';

export interface AuthState {
  isLogged: boolean;
  user: string | null;
}

export const initialState: AuthState = {
  isLogged: false,
  user: null,
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
