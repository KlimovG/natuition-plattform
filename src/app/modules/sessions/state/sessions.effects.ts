import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SessionsService } from '../service/sessions.service';

import { map, mergeMap, switchMap } from 'rxjs';
import {
  GetMoreSessionsForRobot,
  GetMoreSessionsForRobotSuccess,
  GetSessionsForRobot,
  GetSessionsForRobotSuccess,
  SessionsActionTypes,
  SetActiveSession,
} from './sessions.actions';

@Injectable()
export class SessionsEffects {
  constructor(private action$: Actions, private service: SessionsService) {}

  getRobotsForCustomer$ = createEffect(() =>
    this.action$.pipe(
      ofType<GetSessionsForRobot>(SessionsActionTypes.GET_SESSIONS_ROBOT),
      switchMap(({ payload }) =>
        this.service.getSessionsForRobot(payload).pipe(
          map((sessions) => {
            return new GetSessionsForRobotSuccess(sessions);
          })
        )
      )
    )
  );

  setInitialActiveSession$ = createEffect(() =>
    this.action$.pipe(
      ofType<GetSessionsForRobotSuccess>(
        SessionsActionTypes.GET_SESSIONS_ROBOT_SUCCESS
      ),
      mergeMap(({ payload }) => {
        const newSession = payload.at(0).id;
        return [new SetActiveSession(newSession)];
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
