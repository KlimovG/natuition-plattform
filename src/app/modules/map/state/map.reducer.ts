import { PathModel } from '../models/path.model';
import { ExtractedWeedModel } from '../models/extracted-weed.model';
import { FieldModel } from '../models/field.model';
import { MapActionTypes, MapActionUnion } from './map.actions';
import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { SesssionsState } from '../../sessions/state/sessions.reducer';
import { LngLat } from 'mapbox-gl';

export interface MapState {
  path: PathModel[];
  extractedPoints: ExtractedWeedModel[];
  field: FieldModel;
}

export const initialState: MapState = {
  path: null,
  extractedPoints: null,
  field: null,
};

export function reducer(state = initialState, action: MapActionUnion) {
  switch (action.type) {
    case MapActionTypes.GET_FIELD_SUCCESS:
      return {
        ...state,
        field: action.payload,
      };
    case MapActionTypes.GET_PATH_SUCCESS:
      return {
        ...state,
        path: action.payload,
      };
    case MapActionTypes.GET_EXTRACTED_SUCCESS:
      return {
        ...state,
        extractedPoints: action.payload,
      };
    default:
      return state;
  }
}

export const selectFeature = createFeatureSelector<MapState>('map');

export const selectCorners = (): MemoizedSelector<any, FieldModel> =>
  createSelector(selectFeature, (state) => state.field);
