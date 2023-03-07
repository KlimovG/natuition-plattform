import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../../state';
import { filter, map, Observable } from 'rxjs';
import { selectActiveRobot } from '../../../robots/state/robots.reducer';
import { selectActiveSessionData } from '../../../sessions/state/sessions.reducer';

@Component({
  selector: 'app-smart-active-data',
  template: `
    <app-active-data
      [session]="activeSession$ | async"
      [robot]="activeRobot$ | async"
    >
    </app-active-data>
  `,
})
export class SmartActiveDataComponent implements OnInit {
  activeRobot$: Observable<string>;
  activeSession$: Observable<string>;
  constructor(private store: Store<State>) {}
  ngOnInit() {
    this.activeRobot$ = this.store.select(selectActiveRobot());
    this.activeSession$ = this.store.select(selectActiveSessionData()).pipe(
      filter((s) => !!s),
      map((session) => session.startTime)
    );
  }
}
