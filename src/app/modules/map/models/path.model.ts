export interface PathModel {
  id: number;
  latitude: number;
  longitude: number;
}

export interface PathModelFromServer {
  id: number;
  gpsPoint: {
    longitude: number;
    latitude: number;
  };
}
