import { Component, Inject, OnInit } from '@angular/core';
import { combineLatestWith, interval, map, Observable } from 'rxjs';
import { TokenStorageService } from '../../../auth/service/token-storage.service';
import { State } from '../../../../state';
import { Store } from '@ngrx/store';
import { isLogged } from '../../../auth/state/auth.reducer';
import { AuthService } from '../../../auth/service/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  host: {
    class: 'w-full h-full flex flex-col justify-between',
  },
})
export class CoreComponent implements OnInit {
  intervalForRefresh$ = interval(14 * 60 * 1000); // 14 minutes
  isSmallScreen$: Observable<any>;
  isMediumScreen$: Observable<any>;
  isLargeScreen$: Observable<any>;
  constructor(
    private tokenService: TokenStorageService,
    private store: Store<State>,
    private authService: AuthService,
    private breakpointObserver: BreakpointObserver,
    @Inject(DOCUMENT) private document: Document
  ) {}

  async ngOnInit() {
    console.log('Breakpoints', Breakpoints);
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
        console.log('isSmallScreen$: ', value);
        this.updateRootFontSize('12px');
      }
    });
    this.isMediumScreen$ = this.breakpointObserver
      .observe([Breakpoints.Tablet])
      .pipe(map((result) => result.matches));
    this.isMediumScreen$.subscribe((value) => {
      if (value) {
        console.log('isMediumScreen$: ', value);
        this.updateRootFontSize('14px');
      }
    });
    this.isLargeScreen$ = this.breakpointObserver
      .observe([Breakpoints.Web])
      .pipe(map((result) => result.matches));
    this.isLargeScreen$.subscribe((value) => {
      if (value) {
        console.log('isLargeScreen$: ', value);
        this.updateRootFontSize('16px');
      }
    });
  }

  private updateRootFontSize(fontSize: string): void {
    this.document.documentElement.style.fontSize = fontSize;
  }
}
