import {
  LanguageState,
  reducer as languageReducer,
} from '../shared/i18n/state/i18n.reducer';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import {
  AuthState,
  reducer as authReducer,
} from '../modules/auth/state/auth.reducer';

export interface State {
  language: LanguageState;
  auth: AuthState;
}

export const reducers: ActionReducerMap<State, any> = {
  language: languageReducer,
  auth: authReducer,
};

export const metaReducers: Array<MetaReducer<State>> = [];
