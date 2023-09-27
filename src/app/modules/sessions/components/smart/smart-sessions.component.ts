import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../../../state';
import { firstValueFrom, map, Observable, Subscription } from 'rxjs';
import { SessionModel } from '../../models/session.model';
import {
  isRobotSessionsLoading,
  selectActiveSession,
  selectSessions,
} from '../../state/sessions.reducer';
import {
  GetMoreSessionsForRobot,
  SetLastSession,
} from '../../state/sessions.actions';
import { selectActiveRobotSerial } from '../../../robots/state/robots.reducer';
import { IButtonsData } from '../../../../shared/components/buttons-list/buttons-list.component';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-smart-sessions',
  template: `
    <app-sessions
      class="p-4 pl-6 block h-full flex flex-col"
      [isDataLoading]="isDataLoading$ | async"
      [sessions]="sessions$ | async"
      [activeSession]="activeSession$ | async"
      (onSessionClick)="onSessionClick($event)"
      (onMoreClick)="getMoreSessions()"
    >
    </app-sessions>
  `,
})
export class SmartSessionsComponent implements OnInit {
  sessions$: Observable<IButtonsData[]>;
  activeSession$: Observable<string>;
  isDataLoading$: Observable<boolean>;
  isNewRobot: boolean = true;
  private _currentRobot: string;
  spinnerSubscription: Subscription;
  constructor(private store: Store<State>) {}

  set currentRobot(robot: string) {
    this._currentRobot = robot;
  }

  get currentRobot(): string {
    return this._currentRobot;
  }

  async ngOnInit() {
    this.isDataLoading$ = this.store.select(isRobotSessionsLoading());
    this.loadSessions();
  }

  private loadSessions() {
    this.activeSession$ = this.store.select(selectActiveSession());
    this.sessions$ = this.store.pipe(
      select(selectSessions()),
      map((sessions) => {
        if (sessions?.length === 0 || !sessions) {
          return null;
        }
        const calcDuration = (start: string, end: string) => {
          return DateTime.fromISO(end)
            .diff(DateTime.fromISO(start))
            .toFormat("h 'h.' m 'min.'");
        };
        return sessions.map((session: SessionModel) => ({
          label: 'sessions.btn',
          id: session.id.toString(),
          date: session.startTime,
          duration: calcDuration(session.startTime, session.endTime),
          field: session.field,
          extracted: session.extracted,
        }));
      })
    );
  }

  onSessionClick(session: string) {
    this.store.dispatch(new SetLastSession(session));
  }

  async getMoreSessions() {
    const lastSession = await firstValueFrom(
      this.store.select(selectSessions())
    );
    const robot = await firstValueFrom(
      this.store.select(selectActiveRobotSerial())
    );
    this.store.dispatch(
      new GetMoreSessionsForRobot({
        serial: robot,
        serialId: lastSession.at(-1).id,
      })
    );
  }
}
