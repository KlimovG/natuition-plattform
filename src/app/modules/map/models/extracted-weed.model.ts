export interface ExtractedWeedModel {
  id: number;
  label: string;
  number: number;
  lng: number;
  lat: number;
}

export interface ExtractedWeedModelFromServer {
  id: number;
  weedType: {
    label: string;
  };
  pointPath: {
    gpsPoint: {
      latitude: number;
      longitude: number;
    };
  };
  number: number;
}
