import { Action } from '@ngrx/store';

export enum LanguageActionTypes {
  UPDATE_LANGUAGE = '[i18n] Update Language'
}

export class UpdateLanguage implements Action {
  readonly type = LanguageActionTypes.UPDATE_LANGUAGE;

  constructor(public payload: string) {}
}

export type LanguageActionsUnion = UpdateLanguage;
