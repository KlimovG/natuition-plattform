import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  GetRobotsForCustomer,
  SetActiveRobot,
} from '../../state/robots.actions';
import { selectUserID } from '../../../auth/state/auth.reducer';
import { State } from '../../../../state';
import { selectActiveRobot, selectRobots } from '../../state/robots.reducer';
import { filter, map, Observable, skip } from 'rxjs';
import { RobotModel } from '../../models/robot.model';
import { IButtonsData } from '../../../../shared/components/buttons-list/buttons-list.component';

@Component({
  selector: 'app-smart-robots',
  template: ` <app-robots-list
    *ngIf="robots$ | async"
    [robots]="robots$ | async"
    [activeRobot]="activeRobot$ | async"
    (onRobotClick)="onRobotClick($event)"
  >
  </app-robots-list>`,
  styleUrls: ['./smart-robots.component.scss'],
})
export class SmartRobotsComponent implements OnInit, OnDestroy {
  robots$: Observable<IButtonsData[]>;
  activeRobot$: Observable<string>;
  _activeRobot: string;
  // private subscriptionsList: Subscription[] = [];

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.store.select(selectUserID).subscribe((id) => {
      this.store.dispatch(new GetRobotsForCustomer(id));
    });
    this.activeRobot$ = this.store.pipe(select(selectActiveRobot()), skip(1));
    this.robots$ = this.store.pipe(
      select(selectRobots()),
      filter((robots) => !!robots),
      map((robots) => {
        return robots.map((robot: RobotModel) => ({
          label: robot.robotSerialNumber,
          id: robot.robotSerialNumber,
        }));
      })
    );
  }

  ngOnDestroy() {
    // this.subscriptionsList.forEach((s) => s.unsubscribe());
  }

  onRobotClick(robot: string) {
    this.activeRobot = robot;
    this.store.dispatch(new SetActiveRobot(robot));
  }

  set activeRobot(robot: string) {
    this._activeRobot = robot;
  }
  get activeRobot(): string {
    return this._activeRobot;
  }
}
