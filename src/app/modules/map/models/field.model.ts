import { GpsPointModel } from './gps-point.model';

export interface FieldModel {
  id: number;
  label?: string;
  corners: GpsPointModel[];
}

export interface FieldModelFromServer {
  id: number;
  label?: string;
  points: GpsPointModel[];
}
