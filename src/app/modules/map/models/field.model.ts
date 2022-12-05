import { LngLat } from 'mapbox-gl';
import { GpsPointModel } from './gps-point.model';

export interface FieldModel {
  id: number;
  label?: string;
  corners: LngLat[];
}

export interface FieldModelFromServer {
  id: number;
  label?: string;
  corners: { gpsPoint: GpsPointModel[] };
}
