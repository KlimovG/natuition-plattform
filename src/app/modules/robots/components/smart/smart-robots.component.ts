import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { SetActiveRobot } from '../../state/robots.actions';
import { State } from '../../../../state';
import {
  isRobotListLoading,
  selectActiveRobotSerial,
  selectRobots,
} from '../../state/robots.reducer';
import { filter, Observable } from 'rxjs';
import { RobotModel } from '../../models/robot.model';

@Component({
  selector: 'app-smart-robots',
  template: `
    <app-robots-list
      class="p-4 pl-6 h-full flex flex-col"
      *ngIf="robots$ | async"
      [robots]="robots$ | async | attachStatus"
      [activeRobot]="activeRobot$ | async"
      [showHeader]="showHeader"
      (onRobotClick)="onRobotClick($event)"
    >
    </app-robots-list>
  `,
})
export class SmartRobotsComponent implements OnInit {
  @Input() showHeader: boolean;

  robots$: Observable<RobotModel[]>;
  isRobotListLoading$: Observable<boolean>;
  activeRobot$: Observable<string>;
  _activeRobot: string;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.isRobotListLoading$ = this.store.select(isRobotListLoading());
    this.activeRobot$ = this.store.pipe(select(selectActiveRobotSerial()));
    this.robots$ = this.store.pipe(
      select(selectRobots()),
      filter((robots) => !!robots)
    );
  }

  onRobotClick(robot: RobotModel) {
    this.activeRobot = robot.serial;
    this.store.dispatch(new SetActiveRobot(robot));
  }

  set activeRobot(robot: string) {
    this._activeRobot = robot;
  }

  get activeRobot(): string {
    return this._activeRobot;
  }
}
