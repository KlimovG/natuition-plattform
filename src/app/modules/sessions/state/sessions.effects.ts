import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SessionsService } from '../service/sessions.service';

import { map, mergeMap, switchMap } from 'rxjs';
import {
  GetLastSessionForRobot,
  GetMoreSessionsForRobot,
  GetMoreSessionsForRobotSuccess,
  GetSessionsForRobot,
  GetSessionsForRobotSuccess,
  SessionsActionTypes,
  SetLastSession,
} from './sessions.actions';
import { GetMapForSession } from '../../map/state/map.actions';
import { GetStatistic } from '../../statistic/state/statistic.actions';

@Injectable()
export class SessionsEffects {
  constructor(private action$: Actions, private service: SessionsService) {}

  getRobotsForCustomer$ = createEffect(() =>
    this.action$.pipe(
      ofType<GetSessionsForRobot>(SessionsActionTypes.GET_SESSIONS_ROBOT),
      switchMap(({ payload }) =>
        this.service
          .getSessionsForRobot(payload)
          .pipe(
            mergeMap((sessions) => [
              new GetSessionsForRobotSuccess(sessions),
              new SetLastSession(sessions.at(0).id.toString()),
            ])
          )
      )
    )
  );

  // getLastSession$ = createEffect(() =>
  //   this.action$.pipe(
  //     ofType<GetLastSessionForRobot>(SessionsActionTypes.GET_LAST_SESSION),
  //     switchMap(({ payload }) =>
  //       this.service.getLastSession(payload).pipe(
  //         map((sessions) => {
  //           return new SetLastSession(sessions);
  //         })
  //       )
  //     )
  //   )
  // );

  setActiveSessionStatistik$ = createEffect(() =>
    this.action$.pipe(
      ofType<SetLastSession>(SessionsActionTypes.SET_ACTIVE_SESSION),
      mergeMap(({ payload }) => {
        return [
          new GetMapForSession(Number(payload)),
          new GetStatistic(payload),
        ];
      })
    )
  );

  getMoreRobotsForCustomer$ = createEffect(() =>
    this.action$.pipe(
      ofType<GetMoreSessionsForRobot>(
        SessionsActionTypes.GET_MORE_SESSIONS_FOR_ROBOT
      ),
      switchMap(({ payload }) =>
        this.service
          .getMoreSessionsForRobot(payload.serial, payload.serialId)
          .pipe(
            map((sessions) => {
              return new GetMoreSessionsForRobotSuccess(sessions);
            })
          )
      )
    )
  );
}
