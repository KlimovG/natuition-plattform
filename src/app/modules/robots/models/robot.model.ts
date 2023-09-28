import { Observable } from 'rxjs';

export class RobotModel {
  id?: number;
  userId?: number;
  serial: string;
  status: RobotStatus;
  status$?: Observable<RobotStatus>;
}

export enum RobotStatus {
  ON = 'OP',
  ONLINE = 'ONLINE',
  ACTIVE = 'WORKING',
  LEFT_AREA = 'ANTI THEFT',
  PROBLEM = 'HS',
  OFF = 'OFF',
}
