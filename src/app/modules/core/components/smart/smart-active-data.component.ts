import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../../state';
import { filter, map, Observable } from 'rxjs';
import { selectActiveRobot } from '../../../robots/state/robots.reducer';
import { selectActiveSessionData } from '../../../sessions/state/sessions.reducer';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-smart-active-data',
  template: `
    <app-active-data
      [session]="activeSession$ | async"
      [robot]="activeRobot$ | async"
      [isMobile]="isMobile$ | async"
    >
    </app-active-data>
  `,
})
export class SmartActiveDataComponent implements OnInit {
  activeRobot$: Observable<string>;
  activeSession$: Observable<string>;
  isMobile$: Observable<boolean>;
  isTablet$: Observable<boolean>;

  constructor(
    private store: Store<State>,
    private breakpointObserver: BreakpointObserver
  ) {}
  ngOnInit() {
    this.isMobile$ = this.breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(map((result) => result.matches));
    this.isTablet$ = this.breakpointObserver
      .observe([Breakpoints.Tablet])
      .pipe(map((result) => result.matches));
    this.activeRobot$ = this.store.select(selectActiveRobot());
    this.activeSession$ = this.store.select(selectActiveSessionData()).pipe(
      filter((s) => !!s),
      map((session) => session.startTime)
    );
  }
}
