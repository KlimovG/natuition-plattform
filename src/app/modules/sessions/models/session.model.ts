export interface SessionModel {
  id: number;
  startTime: string;
  endTime: string;
  field: string;
  extracted?: number;
  prevSessionId?: number;
}

export interface SessionModelFromServer {
  id: number;
  startTime: string;
  endTime: string;
  extracted?: number;
  fieldName: { label: string };
  prevSessionId?: number;
}
