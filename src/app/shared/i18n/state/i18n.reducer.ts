import { LanguageActionsUnion, LanguageActionTypes } from './i18n.actions';
import {State} from "../../../state";



export interface LanguageState {
  lang: string;
}

export const initialState: LanguageState = {
  lang: 'en'
};

export function reducer(state = initialState, action: LanguageActionsUnion): LanguageState {
  switch (action.type) {
    case LanguageActionTypes.UPDATE_LANGUAGE:
      return {
        ...state,
        lang: action.payload
      };
    default:
      return state;
  }
}

export const selectLanguage = ( state: State) => state.language.lang
