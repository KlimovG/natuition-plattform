import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  GetRobotsForCustomer,
  SetActiveRobot,
} from '../../state/robots.actions';
import { selectUserID } from '../../../auth/state/auth.reducer';
import { State } from '../../../../state';
import { selectActiveRobot, selectRobots } from '../../state/robots.reducer';
import {
  combineLatest,
  filter,
  map,
  Observable,
  Subscription,
  takeWhile,
} from 'rxjs';
import { RobotModel } from '../../models/robot.model';
import { IButtonsData } from '../../../../shared/components/buttons-list/buttons-list.component';

@Component({
  selector: 'app-smart-robots',
  template: `
    <app-robots-list
      class="p-6 block h-full flex flex-col"
      *ngIf="robots$ | async"
      [robots]="robots$ | async"
      [activeRobot]="activeRobot$ | async"
      (onRobotClick)="onRobotClick($event)"
    ></app-robots-list>
  `,
})
export class SmartRobotsComponent implements OnInit, OnDestroy {
  robots$: Observable<IButtonsData[]>;
  activeRobot$: Observable<string>;
  _activeRobot: string;
  private subscriptionsList: Subscription[] = [];

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.store.select(selectUserID).subscribe((id) => {
      this.store.dispatch(new GetRobotsForCustomer(id));
    });
    this.activeRobot$ = this.store.pipe(select(selectActiveRobot()));
    this.robots$ = this.store.pipe(
      select(selectRobots()),
      filter((robots) => !!robots),
      map((robots) => {
        return robots.map((robot: RobotModel, index) => ({
          label: robot.serial,
          id: robot.serial,
        }));
      })
    );
    this.subscriptionsList.push(
      combineLatest([
        this.store.pipe(select(selectRobots())),
        this.activeRobot$,
      ])
        .pipe(takeWhile(([_, active]) => !active))
        .subscribe(([robots]) => {
          console.log(robots);
          robots.forEach(({ serial }, i) => {
            if (i === 0) {
              this.store.dispatch(new SetActiveRobot(serial));
            }
          });
        })
    );
  }

  ngOnDestroy() {
    this.subscriptionsList.forEach((s) => s.unsubscribe());
  }

  onRobotClick(robot: string) {
    console.log(robot);

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
