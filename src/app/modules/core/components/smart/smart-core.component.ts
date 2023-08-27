import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  combineLatestWith,
  interval,
  map,
  Observable,
  Subscription,
} from 'rxjs';
import { TokenStorageService } from '../../../auth/service/token-storage.service';
import { select, Store } from '@ngrx/store';
import { State } from '../../../../state';
import { AuthService } from '../../../auth/service/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { isLogged } from '../../../auth/state/auth.reducer';
import { GetRobotsForCustomer } from '../../../robots/state/robots.actions';
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
  intervalForRefresh$ = interval(5 * 59 * 60 * 1000); // 5 hours 59 minutes

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
    this.isSmallScreen$ = this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .pipe(map((result) => result.matches));

    this.isMediumScreen$ = this.breakpointObserver
      .observe([Breakpoints.Small])
      .pipe(map((result) => result.matches));

    this.isLargeScreen$ = this.breakpointObserver
      .observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
      .pipe(map((result) => result.matches));
    this.subscriptionsList.push(
      this.intervalForRefresh$
        .pipe(combineLatestWith(isLogged$))
        .subscribe(([_, isLogged]) => {
          if (isLogged) {
            this.authService.refresh();
          }
        }),
      this.isSmallScreen$.subscribe((value) => {
        if (value) {
          this.updateRootFontSize('14px');
        }
      }),
      this.isMediumScreen$.subscribe((value) => {
        if (value) {
          this.updateRootFontSize('16px');
        }
      }),
      this.isLargeScreen$.subscribe((value) => {
        if (value) {
          this.updateRootFontSize('16px');
        }
      }),
      this.breakpointObserver
        .observe([Breakpoints.XLarge])
        .pipe(map((result) => result.matches))
        .subscribe((value) => {
          if (value) {
            this.updateRootFontSize('18px');
          }
        })
    );

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
