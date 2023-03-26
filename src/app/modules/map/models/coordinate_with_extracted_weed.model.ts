export interface CoordinatesWithExtractedWeedFromRobot {
    coordinate_with_extracted_weed: CoordinateWithExtractedWeed[];
    session_id: number;
}

export interface CoordinateWithExtractedWeed {
    extracted_weeds?: { [index: string]: number; };
    path_point_number: number;
    current_coordinate: number[];
}