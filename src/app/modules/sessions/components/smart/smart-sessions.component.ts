import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../../../state';
import { map, Observable, Subscription } from 'rxjs';
import { SessionModel } from '../../models/session.model';
import {
  selectActiveSession,
  selectSessions,
} from '../../state/sessions.reducer';
import {
  GetSessionsForRobot,
  SetActiveSession,
} from '../../state/sessions.actions';
import { selectActiveRobot } from '../../../robots/state/robots.reducer';

@Component({
  selector: 'app-smart-sessions',
  template: ` <app-sessions-list
    [sessions]="sessions$ | async"
    [activeSession]="activeSession$ | async"
    (onSessionClick)="onRobotClick($event)"
  >
  </app-sessions-list>`,
})
export class SmartSessionsComponent implements OnInit, OnDestroy {
  sessions$: Observable<string[]>;
  activeSession$: Observable<string>;
  private subscriptionsList: Subscription[] = [];

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.store.select(selectActiveRobot()).subscribe((robot) => {
      if (robot) {
        this.store.dispatch(new GetSessionsForRobot(robot));
      }
    });
    this.activeSession$ = this.store.select(selectActiveSession());
    this.sessions$ = this.store.pipe(
      select(selectSessions()),
      map((sessions) => {
        if (sessions?.length === 0) {
          return null;
        }
        return sessions.map((session: SessionModel) => {
          return session.startTime as string;
        });
      })
    );
    this.subscriptionsList.push(
      this.sessions$.subscribe((sessions) =>
        sessions.forEach((session, i) => {
          console.log(sessions);
          if (i === 0) {
            this.store.dispatch(new SetActiveSession(session));
          }
        })
      )
    );
  }

  ngOnDestroy() {
    this.subscriptionsList.forEach((s) => s.unsubscribe());
  }

  onRobotClick(session: string) {
    this.store.dispatch(new SetActiveSession(session));
  }
}