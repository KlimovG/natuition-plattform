import {LanguageState, reducer as languageReducer} from "../shared/i18n/state/i18n.reducer";
import {ActionReducerMap, MetaReducer} from "@ngrx/store";

export interface State {
  language: LanguageState;
}

export const reducers: ActionReducerMap<State, any> = {
  language: languageReducer,
}

export const metaReducers: Array<MetaReducer<State>> = [];
