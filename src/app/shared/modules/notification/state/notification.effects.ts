import {
  CloseNotification,
  NotificationActionTypes,
  OpenNotification,
} from './notification.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { delay, map, mergeMap, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class NotificationEffects {
  constructor(private actions$: Actions, protected router: Router) {}
  open$ = createEffect(() =>
    this.actions$.pipe(
      ofType<OpenNotification>(NotificationActionTypes.OPEN),
      mergeMap(() =>
        of(null).pipe(
          delay(3000), // wait for 3 seconds
          map(() => new CloseNotification()) // dispatch the new action
        )
      )
    )
  );
}
