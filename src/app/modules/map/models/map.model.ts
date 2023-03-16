export interface MapData {
  field: FieldType;
  path: PathType;
  extractedPoints: ExtractedType;
}

export type FieldType = GeoJSON.Feature<GeoJSON.Polygon>;
export type PathType = GeoJSON.Feature<GeoJSON.Polygon>;
export type ExtractedType = GeoJSON.Feature<GeoJSON.MultiPoint>;
