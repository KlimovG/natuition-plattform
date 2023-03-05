import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  GetRobotsForCustomer,
  SetActiveRobot,
} from '../../state/robots.actions';
import { selectUserID } from '../../../auth/state/auth.reducer';
import { State } from '../../../../state';
import {
  isRobotListLoading,
  selectActiveRobot,
  selectRobots,
} from '../../state/robots.reducer';
import {
  combineLatest,
  filter,
  interval,
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
      class="p-4 pl-6 block h-full flex flex-col"
      *ngIf="robots$ | async"
      [robots]="robots$ | async"
      [activeRobot]="activeRobot$ | async"
      (onRobotClick)="onRobotClick($event)"
    ></app-robots-list>
  `,
})
export class SmartRobotsComponent implements OnInit, OnDestroy {
  robots$: Observable<IButtonsData[]>;
  isRobotListLoading$: Observable<boolean>;
  activeRobot$: Observable<string>;
  _activeRobot: string;
  private subscriptionsList: Subscription[] = [];
  protected intervalForRefresh$ = interval(5 * 1000); // 1 minute

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.isRobotListLoading$ = this.store.select(isRobotListLoading());
    this.store.select(selectUserID).subscribe((id) => {
      this.store.dispatch(new GetRobotsForCustomer(id));
    });
    this.activeRobot$ = this.store.pipe(select(selectActiveRobot()));
    this.robots$ = this.store.pipe(
      select(selectRobots()),
      filter((robots) => !!robots),
      map((robots) => {
        return robots.map((robot: RobotModel) => ({
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
          robots.forEach(({ serial }, i) => {
            if (i === 0) {
              this.store.dispatch(new SetActiveRobot(serial));
            }
          });
        })
      // this.intervalForRefresh$
      //   .pipe(
      //     combineLatestWith(this.robots$),
      //     combineLatestWith(this.store.select(isLogged))
      //   )
      //   .subscribe(async ([[_, robots], isLogged]) => {
      //     if (isLogged && robots?.length > 0) {
      //       for await (const robot of robots) {
      //         const status = await firstValueFrom(
      //           this.service.getRobotStatus(robot.label)
      //         );
      //         console.log('Response', status);
      //       }
      //     }
      //   })
    );
  }

  ngOnDestroy() {
    this.subscriptionsList.forEach((s) => s.unsubscribe());
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
