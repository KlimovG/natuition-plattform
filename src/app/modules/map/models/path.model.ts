export interface PathModel {
  id: number;
  lng: number;
  lat: number;
}

export interface PathModelFromServer {
  id: number;
  gpsPoint: {
    longitude: number;
    latitude: number;
  };
}
