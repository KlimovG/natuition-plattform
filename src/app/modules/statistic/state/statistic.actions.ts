import { Action } from '@ngrx/store';
import { StatisticModelFromServer } from '../models/statistic.model';

export enum StatisticActionTypes {
  GET_STATISTIC = '[Statistic] Get statistic for session',
  GET_STATISTIC_SUCCESS = '[Statistic] Get statistic for session success',
}

export class GetStatistic implements Action {
  readonly type = StatisticActionTypes.GET_STATISTIC;

  constructor(public payload: number) {}
}

export class GetStatisticSuccess implements Action {
  readonly type = StatisticActionTypes.GET_STATISTIC_SUCCESS;

  constructor(public payload: StatisticModelFromServer) {}
}

export type StatisticActionUnion = GetStatistic | GetStatisticSuccess;
