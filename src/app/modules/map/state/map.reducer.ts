import { MapActionTypes, MapActionUnion } from './map.actions';
import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { MapDataFromServer } from '../models/map-data-from-server.model';

export interface MapState {
  isLoading: boolean;
  map: MapDataFromServer;
}

export const initialState: MapState = {
  isLoading: false,
  map: null,
};

export function reducer(state = initialState, action: MapActionUnion) {
  switch (action.type) {
    case MapActionTypes.GET_MAP_DATA:
      return {
        ...state,
        isLoading: true,
      };
    case MapActionTypes.GET_MAP_DATA_SUCCESS:
      return {
        isLoading: false,
        map: action.payload,
      };
    case MapActionTypes.GET_MAP_DATA_FAILURE:
      return {
        isLoading: false,
        map: null,
      };
    default:
      return state;
  }
}

export const selectFeature = createFeatureSelector<MapState>('map');

export const selectMapData = (): MemoizedSelector<any, MapDataFromServer> =>
  createSelector(selectFeature, (state) => {
    return state.map;
  });

export const selectMapLoading = (): MemoizedSelector<any, boolean> =>
  createSelector(selectFeature, (state) => {
    return state.isLoading;
  });
