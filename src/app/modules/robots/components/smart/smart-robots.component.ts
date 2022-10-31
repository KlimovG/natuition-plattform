import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { GetRobotsForCustomer } from '../../state/robots.actions';
import { selectUserID } from '../../../auth/state/auth.reducer';
import { State } from '../../../../state';
import { RobotsState, selectRobots } from '../../state/robots.reducer';
import { map, Observable, Subscription } from 'rxjs';
import { RobotModel } from '../../models/robot.model';

@Component({
  selector: 'app-smart-robots',
  template: ` <app-robots-list
    *ngIf="robots$ | async"
    [robots]="robots$ | async"
    [activeRobot]="activeRobot"
    (onRobotClick)="onRobotClick($event)"
  >
  </app-robots-list>`,
  styleUrls: ['./smart-robots.component.scss'],
})
export class SmartRobotsComponent implements OnInit, OnDestroy {
  robots$!: Observable<string[]>;
  _activeRobot!: string;
  private subscriptionsList: Subscription[] = [];

  constructor(
    private store: Store<State>,
    private robotsStore: Store<RobotsState>
  ) {}

  ngOnInit() {
    this.store.select(selectUserID).subscribe((id) => {
      this.store.dispatch(new GetRobotsForCustomer(id));
    });
    this.robots$ = this.robotsStore.pipe(
      select(selectRobots()),
      map((robots) => {
        if (robots) {
          return robots.map((robot: RobotModel) => {
            return robot.robotSerialNumber;
          });
        }
        return [];
      })
    );

    this.subscriptionsList.push(
      this.robots$.subscribe((robots) =>
        robots.forEach((robot, i) => {
          if (i === 0) {
            this.activeRobot = robot;
          }
        })
      )
    );
  }

  ngOnDestroy() {
    this.subscriptionsList.forEach((s) => s.unsubscribe());
  }

  onRobotClick(robot: string) {
    this.activeRobot = robot;
  }

  set activeRobot(robot: string) {
    this._activeRobot = robot;
  }
  get activeRobot(): string {
    return this._activeRobot;
  }
}
