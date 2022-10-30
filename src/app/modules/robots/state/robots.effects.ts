import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RobotsService } from '../service/robots.service';
import {
  GetRobotsForCustomer,
  GetRobotsForCustomerSuccess,
  RobotsActionTypes,
} from './robots.actions';
import { map, switchMap } from 'rxjs';

@Injectable()
export class RobotsEffects {
  constructor(private action$: Actions, private service: RobotsService) {}

  getRobotsForCustomer$ = createEffect(() =>
    this.action$.pipe(
      ofType<GetRobotsForCustomer>(RobotsActionTypes.GET_ROBOTS_CUSTOMER),
      switchMap(({ payload }) =>
        this.service
          .getRobotsForCustomer(payload)
          .pipe(map(({ data }) => new GetRobotsForCustomerSuccess(data)))
      )
    )
  );
}
