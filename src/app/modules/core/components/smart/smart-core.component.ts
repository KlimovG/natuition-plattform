import { Component, Inject } from '@angular/core';
import { combineLatestWith, interval, map, Observable } from 'rxjs';
import { TokenStorageService } from '../../../auth/service/token-storage.service';
import { Store } from '@ngrx/store';
import { State } from '../../../../state';
import { AuthService } from '../../../auth/service/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { isLogged } from '../../../auth/state/auth.reducer';

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
export class SmartCoreComponent {
  intervalForRefresh$ = interval(14 * 60 * 1000); // 14 minutes
  isSmallScreen$: Observable<any>;
  isMediumScreen$: Observable<any>;
  isLargeScreen$: Observable<any>;
  addStyles: boolean;
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
    this.intervalForRefresh$
      .pipe(combineLatestWith(isLogged$))
      .subscribe(([_, isLogged]) => {
        if (isLogged) {
          this.authService.refresh();
        }
      });
    this.isSmallScreen$ = this.breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(map((result) => result.matches));
    this.isSmallScreen$.subscribe((value) => {
      if (value) {
        this.updateRootFontSize('14px');
      }
    });
    this.isMediumScreen$ = this.breakpointObserver
      .observe([Breakpoints.Tablet])
      .pipe(map((result) => result.matches));
    this.isMediumScreen$.subscribe((value) => {
      if (value) {
        this.updateRootFontSize('14px');
      }
    });
    this.isLargeScreen$ = this.breakpointObserver
      .observe([Breakpoints.Web])
      .pipe(map((result) => result.matches));
    this.isLargeScreen$.subscribe((value) => {
      if (value) {
        this.updateRootFontSize('16px');
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

  private updateRootFontSize(fontSize: string): void {
    this.document.documentElement.style.fontSize = fontSize;
  }
}
