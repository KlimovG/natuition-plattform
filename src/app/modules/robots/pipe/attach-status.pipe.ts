import { Pipe, PipeTransform } from '@angular/core';
import { RobotModel } from '../models/robot.model';
import { RobotsService } from '../service/robots.service';

@Pipe({
  name: 'attachStatus',
})
export class AttachStatusPipe implements PipeTransform {
  constructor(private socketService: RobotsService) {}

  transform(robots: RobotModel[]): RobotModel[] {
    return robots.map((robot) => {
      this.socketService.subscribeRobot(robot.serial);
      const status$ = this.socketService.getRobotStatus(robot.serial);
      return { ...robot, status$ };
    });
  }
}
