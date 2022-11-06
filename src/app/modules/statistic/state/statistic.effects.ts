import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StatisticService } from '../service/statistic.service';

import { map, switchMap } from 'rxjs';
import {
  GetStatistic,
  GetStatisticSuccess,
  StatisticActionTypes,
} from './statistic.actions';

@Injectable()
export class StatisticEffects {
  constructor(private action$: Actions, private service: StatisticService) {}

  getStatistic$ = createEffect(() =>
    this.action$.pipe(
      ofType<GetStatistic>(StatisticActionTypes.GET_STATISTIC),
      switchMap(({ payload }) =>
        this.service.getStatistic(payload).pipe(
          map((statistic) => {
            return new GetStatisticSuccess(statistic);
          })
        )
      )
    )
  );
}
