import { Action } from '@ngrx/store';

export enum NotificationActionTypes {
  OPEN = '[Notification] Open notification',
  CLOSE = '[Notification] Close notification',
}

export class OpenNotification implements Action {
  readonly type = NotificationActionTypes.OPEN;
  constructor(public payload: string) {}
}

export class CloseNotification implements Action {
  readonly type = NotificationActionTypes.CLOSE;
}

export type NotificationActionUnion = OpenNotification | CloseNotification;
