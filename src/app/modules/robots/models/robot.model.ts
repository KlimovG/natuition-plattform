export class RobotModel {
  id?: number;
  userId?: number;
  serial: string;
  status: RobotStatus;
}

export enum RobotStatus {
  ON = 'ON',
  ONLINE = 'ONLINE',
  ACTIVE = 'ACTIVE',
  LEFT_AREA = 'LEFT_AREA',
  PROBLEM = 'PROBLEM',
  OFF = 'OFF',
}
