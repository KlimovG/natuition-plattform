import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SessionsService } from '../service/sessions.service';

import { map, switchMap } from 'rxjs';
import {
  GetSessionsForRobot,
  GetSessionsForRobotSuccess,
  SessionsActionTypes,
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
}
