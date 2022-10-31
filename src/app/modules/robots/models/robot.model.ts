import { IsNotEmpty } from 'class-validator';

export class RobotModel {
  @IsNotEmpty()
  id!: number;
  @IsNotEmpty()
  userId!: number;
  @IsNotEmpty()
  robotSerialNumber!: string;
}
