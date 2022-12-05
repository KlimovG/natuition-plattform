import { Action } from '@ngrx/store';
import { FieldModel } from '../models/field.model';
import { PathModel } from '../models/path.model';
import { ExtractedWeedModel } from '../models/extracted-weed.model';

export enum MapActionTypes {
  GET_FIELD = '[Map] Get field data for session',
  GET_FIELD_SUCCESS = '[Map] Get field data for session success',
  GET_FIELD_FAILURE = '[Map] Get field data for session failed',
  GET_PATH = '[Map] Get path data for session',
  GET_PATH_SUCCESS = '[Map] Get path data for session success',
  GET_PATH_FAILURE = '[Map] Get path data for session failed',
  GET_EXTRACTED = '[Map] Get extracted points data for session',
  GET_EXTRACTED_SUCCESS = '[Map] Get extracted points data for session success',
  GET_EXTRACTED_FAILURE = '[Map] Get extracted points data for session failed',
}

export class GetFieldForSession implements Action {
  readonly type = MapActionTypes.GET_FIELD;

  constructor(public payload: number) {}
}

export class GetFieldForSessionSuccess implements Action {
  readonly type = MapActionTypes.GET_FIELD_SUCCESS;

  constructor(public payload: FieldModel) {}
}

export class GetFieldForSessionFailure implements Action {
  readonly type = MapActionTypes.GET_FIELD_FAILURE;

  constructor(public payload: any) {}
}

export class GetPathForSession implements Action {
  readonly type = MapActionTypes.GET_PATH;

  constructor(public payload: number) {}
}

export class GetPathForSessionSuccess implements Action {
  readonly type = MapActionTypes.GET_PATH_SUCCESS;

  constructor(public payload: PathModel[]) {}
}

export class GetPathForSessionFailure implements Action {
  readonly type = MapActionTypes.GET_PATH_FAILURE;

  constructor(public payload: any) {}
}

export class GetExtractedForSession implements Action {
  readonly type = MapActionTypes.GET_EXTRACTED;

  constructor(public payload: number) {}
}

export class GetExtractedForSessionSuccess implements Action {
  readonly type = MapActionTypes.GET_EXTRACTED_SUCCESS;

  constructor(public payload: ExtractedWeedModel[]) {}
}

export class GetExtractedForSessionFailure implements Action {
  readonly type = MapActionTypes.GET_EXTRACTED_FAILURE;

  constructor(public payload: any) {}
}

export type MapActionUnion =
  | GetFieldForSession
  | GetFieldForSessionSuccess
  | GetFieldForSessionFailure
  | GetPathForSession
  | GetPathForSessionSuccess
  | GetPathForSessionFailure
  | GetExtractedForSession
  | GetExtractedForSessionSuccess
  | GetExtractedForSessionFailure;
