import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RobotsService } from '../service/robots.service';
import {
  GetRobotsForCustomer,
  GetRobotsForCustomerSuccess,
  RobotsActionTypes,
  SetActiveRobot,
} from './robots.actions';
import { map, mergeMap, switchMap } from 'rxjs';
import {
  GetLastSessionForRobot,
  GetSessionsForRobot,
} from '../../sessions/state/sessions.actions';

@Injectable()
export class RobotsEffects {
  constructor(private action$: Actions, private service: RobotsService) {}

  getRobotsForCustomer$ = createEffect(() =>
    this.action$.pipe(
      ofType<GetRobotsForCustomer>(RobotsActionTypes.GET_ROBOTS_CUSTOMER),
      switchMap(() =>
        this.service.getRobotForUser().pipe(
          map((robots) => {
            return new GetRobotsForCustomerSuccess(robots);
          })
        )
      )
    )
  );

  setActiveSession$ = createEffect(() =>
    this.action$.pipe(
      ofType<SetActiveRobot>(RobotsActionTypes.SET_ACTIVE_ROBOT),
      mergeMap(({ payload }) => [
        new GetLastSessionForRobot(payload),
        new GetSessionsForRobot(payload),
      ])
    )
  );

  setInitialActiveRobot$ = createEffect(() =>
    this.action$.pipe(
      ofType<GetRobotsForCustomerSuccess>(
        RobotsActionTypes.GET_ROBOTS_CUSTOMER_SUCCESS
      ),
      mergeMap(({ payload }) => [new SetActiveRobot(payload.at(0).serial)])
    )
  );
}
