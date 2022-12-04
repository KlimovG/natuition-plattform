import { GpsPointModel } from './gps-point.model';

export interface ExtractedWeedModel {
  id: number;
  label: string;
  number: number;
  latitude: number;
  longitude: number;
}

export interface ExtractedWeedModelFromServer {
  id: number;
  weedType: {
    label: string;
  };
  pointPath: {
    gpsPoint: GpsPointModel;
  };
  number: number;
}
