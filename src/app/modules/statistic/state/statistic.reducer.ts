import { StatisticModelFromServer } from '../models/statistic.model';
import {
  StatisticActionTypes,
  StatisticActionUnion,
} from './statistic.actions';
import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { ChartData } from '../models/chart-data.model';

export interface StatisticState {
  statistic: StatisticModelFromServer;
  isLoading: boolean;
}

export const initialStatistic: StatisticModelFromServer = {
  voltage: null,
  duration: null,
  totalNumber: null,
  chart: null,
};

export const initialState: StatisticState = {
  statistic: initialStatistic,
  isLoading: false,
};

export function reducer(
  state = initialState,
  action: StatisticActionUnion
): StatisticState {
  switch (action.type) {
    case StatisticActionTypes.GET_STATISTIC:
      return {
        ...state,
        isLoading: true,
      };
    case StatisticActionTypes.GET_STATISTIC_SUCCESS:
      return {
        isLoading: false,
        statistic: action.payload,
      };
    default:
      return state;
  }
}

const selectFeature = createFeatureSelector<StatisticState>('statistic');

export const selectStatistic = (): MemoizedSelector<
  any,
  StatisticModelFromServer
> => createSelector(selectFeature, (state) => state.statistic);

export const selectChartData = (): MemoizedSelector<any, ChartData> =>
  createSelector(selectFeature, (state) => state.statistic.chart);

export const isStatisticLoading = (): MemoizedSelector<any, boolean> =>
  createSelector(selectFeature, (state) => state.isLoading);
