import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import {
  NotificationActionTypes,
  NotificationActionUnion,
} from './notification.actions';

export interface NotificationState {
  messages: string[];
}

export const initialState: NotificationState = {
  messages: [],
};

export function reducer(
  state = initialState,
  action: NotificationActionUnion
): NotificationState {
  switch (action.type) {
    case NotificationActionTypes.OPEN:
      return {
        messages: [...state.messages, action.payload],
      };
    case NotificationActionTypes.CLOSE:
      const [first, ...rest] = state.messages;
      return {
        messages: [...rest],
      };
    default:
      return state;
  }
}
const selectFeature = createFeatureSelector<NotificationState>('notifications');

export const selectNotifications = (): MemoizedSelector<any, string[]> =>
  createSelector(selectFeature, (state) => state.messages);
