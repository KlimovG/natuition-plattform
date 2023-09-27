import { Observable } from 'rxjs';

export class RobotModel {
  id?: number;
  userId?: number;
  serial: string;
  status: RobotStatus;
  status$?: Observable<RobotStatus>;
}

export enum RobotStatus {
  ON = 'ON',
  ONLINE = 'ONLINE',
  ACTIVE = 'ACTIVE',
  LEFT_AREA = 'LEFT_AREA',
  PROBLEM = 'PROBLEM',
  OFF = 'OFF',
}
