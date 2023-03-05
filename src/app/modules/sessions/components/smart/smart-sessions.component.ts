import { Component, OnDestroy, OnInit } from '@angular/core';
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
  GetSessionsForRobot,
  SetActiveSession,
} from '../../state/sessions.actions';
import { selectActiveRobot } from '../../../robots/state/robots.reducer';
import { IButtonsData } from '../../../../shared/components/buttons-list/buttons-list.component';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-smart-sessions',
  template: `
    <app-sessions
      class="p-4 block h-full flex flex-col"
      [isLoading]="isDataLoading$ | async"
      [sessions]="sessions$ | async"
      [activeSession]="activeSession$ | async"
      (onSessionClick)="onSessionClick($event)"
      (onMoreClick)="getMoreSessions()"
    >
    </app-sessions>
  `,
})
export class SmartSessionsComponent implements OnInit, OnDestroy {
  sessions$: Observable<IButtonsData[]>;
  activeSession$: Observable<number>;
  isDataLoading$: Observable<boolean>;
  private subscriptionsList: Subscription[] = [];

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.isDataLoading$ = this.store.select(isRobotSessionsLoading());
    this.store.select(selectActiveRobot()).subscribe((robot) => {
      if (robot) {
        this.store.dispatch(new GetSessionsForRobot(robot));
      }
    });
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
    this.subscriptionsList.push(
      this.sessions$.subscribe((sessions) =>
        sessions
          ? sessions.forEach((session, i) => {
              if (i === 0) {
                this.store.dispatch(new SetActiveSession(Number(session.id)));
              }
            })
          : null
      )
    );
  }

  ngOnDestroy() {
    this.subscriptionsList.forEach((s) => s.unsubscribe());
  }

  onSessionClick(session: number) {
    this.store.dispatch(new SetActiveSession(session));
  }

  async getMoreSessions() {
    const lastSession = await firstValueFrom(
      this.store.select(selectSessions())
    );
    const robot = await firstValueFrom(this.store.select(selectActiveRobot()));
    this.store.dispatch(
      new GetMoreSessionsForRobot({
        serial: robot,
        serialId: lastSession.at(-1).id,
      })
    );
  }
}
