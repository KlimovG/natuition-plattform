import { FieldModel } from './field.model';
import { ExtractedWeedModel } from './extracted-weed.model';

export interface MapData {
  field: FieldType;
  path: PathType;
  extractedPoints: ExtractedType;
}

export type FieldType = GeoJSON.Feature<GeoJSON.Polygon>;
export type PathType = GeoJSON.Feature<GeoJSON.Polygon>;
export type ExtractedType = GeoJSON.Feature<GeoJSON.MultiPoint>;

export interface MapDataFromServer {
  field: FieldModel;
  path: [number, number][];
  extractedPoints: ExtractedWeedModel[];
}
