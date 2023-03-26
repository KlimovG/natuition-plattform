import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  combineLatestWith,
  interval,
  map,
  Observable,
  Subscription,
  tap,
} from 'rxjs';
import { TokenStorageService } from '../../../auth/service/token-storage.service';
import { select, Store } from '@ngrx/store';
import { State } from '../../../../state';
import { AuthService } from '../../../auth/service/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { isLogged } from '../../../auth/state/auth.reducer';
import {
  GetRobotsForCustomer,
  UpdateStatusForAllRobots,
} from '../../../robots/state/robots.actions';
import { selectActiveRobotSerial } from '../../../robots/state/robots.reducer';

@Component({
  selector: 'app-smart-core',
  template: `
    <app-core
      [isSmallScreen$]="isSmallScreen$"
      [isMediumScreen$]="isMediumScreen$"
      [isLargeScreen$]="isLargeScreen$"
      [addStyles]="addStyles"
    ></app-core>
  `,
})
export class SmartCoreComponent implements OnInit, OnDestroy {
  intervalForRefresh$ = interval(6 * 59 * 60 * 1000); // 6 hours 59 minutes
  intervalForStatusRefresh$ = interval(60 * 1000); // 1 minute

  isSmallScreen$: Observable<any>;
  isMediumScreen$: Observable<any>;
  isLargeScreen$: Observable<any>;
  activeRobot$: Observable<string>;

  addStyles: boolean;
  private subscriptionsList: Subscription[] = [];

  constructor(
    private tokenService: TokenStorageService,
    private store: Store<State>,
    private authService: AuthService,
    private breakpointObserver: BreakpointObserver,
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) {}

  async ngOnInit() {
    const isLogged$ = this.store.select(isLogged);

    this.store.dispatch(new GetRobotsForCustomer());
    this.activeRobot$ = this.store.pipe(select(selectActiveRobotSerial()));
    this.subscriptionsList.push(
      this.intervalForRefresh$
        .pipe(combineLatestWith(isLogged$))
        .subscribe(([_, isLogged]) => {
          if (isLogged) {
            this.authService.refresh();
          }
        }),
      this.intervalForStatusRefresh$
        .pipe(combineLatestWith(isLogged$))
        .subscribe(([_, isLogged]) => {
          if (isLogged) {
            this.store.dispatch(new UpdateStatusForAllRobots());
          }
        })
    );
    this.isSmallScreen$ = this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .pipe(map((result) => result.matches));
    this.isSmallScreen$.subscribe((value) => {
      if (value) {
        this.updateRootFontSize('14px');
      }
    });
    this.isMediumScreen$ = this.breakpointObserver
      .observe([, Breakpoints.Small])
      .pipe(map((result) => result.matches));
    this.isMediumScreen$.subscribe((value) => {
      if (value) {
        this.updateRootFontSize('16px');
      }
    });
    console.log(Breakpoints);
    this.isLargeScreen$ = this.breakpointObserver
      .observe([Breakpoints.XLarge, Breakpoints.Medium, Breakpoints.Large])
      .pipe(
        tap((result) => {
          console.log('web size:', result);
        }),
        map((result) => result.matches)
      );
    this.isLargeScreen$.subscribe((value) => {
      if (value) {
        this.updateRootFontSize('18px');
      }
    });
    this.router.url.includes('statistic');
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const isStat = event.url.includes('statistic');
        const isMap = event.url.includes('map');
        this.addStyles = isMap || isStat;
      }
    });
  }

  ngOnDestroy() {
    this.subscriptionsList.forEach((s) => s.unsubscribe());
  }

  private updateRootFontSize(fontSize: string): void {
    this.document.documentElement.style.fontSize = fontSize;
  }
}
