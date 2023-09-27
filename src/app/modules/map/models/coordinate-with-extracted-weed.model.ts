export interface CoordinatesWithExtractedWeedFromRobot {
  coordinateWithExtractedWeed: CoordinateWithExtractedWeed[];
  sessionId: number;
}

export interface CoordinateWithExtractedWeed {
  extractedWeeds?: { [index: string]: number };
  pathPointNumber: number;
  currentCoordinate: number[];
}
