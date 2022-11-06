import { StatisticDto } from '../models/statistic.dto';
import {
  StatisticActionTypes,
  StatisticActionUnion,
} from './statistic.actions';
import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';

export interface StatisticState {
  statistic: StatisticDto;
  isLoading: boolean;
}

export const initialState: StatisticState = {
  statistic: null,
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

export const selectStatistic = (): MemoizedSelector<any, StatisticDto> =>
  createSelector(selectFeature, (state) => state.statistic);
