import { Action } from '@ngrx/store';
import { MapDataFromServer } from '../models/map-data-from-server.model';

export enum MapActionTypes {
  GET_MAP_DATA = '[Map] Get map data for session',
  GET_MAP_DATA_SUCCESS = '[Map] Get map data for session success',
  GET_MAP_DATA_FAILURE = '[Map] Get map data for session failure',
}

export class GetMapForSession implements Action {
  readonly type = MapActionTypes.GET_MAP_DATA;

  constructor(public payload: number) {}
}

export class GetMapForSessionSuccess implements Action {
  readonly type = MapActionTypes.GET_MAP_DATA_SUCCESS;

  constructor(public payload: MapDataFromServer) {}
}

export class GetMapForSessionFailure implements Action {
  readonly type = MapActionTypes.GET_MAP_DATA_FAILURE;

  constructor(public payload: any) {}
}

export type MapActionUnion =
  | GetMapForSession
  | GetMapForSessionSuccess
  | GetMapForSessionFailure;
