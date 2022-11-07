import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  host: {
    class: 'w-full h-full',
  },
})
export class CoreComponent implements OnInit, OnDestroy {
  logged: boolean = false;
  // private subscriptionsList: Subscription[] = [];

  ngOnInit(): void {
    // this.subscriptionsList.push(
    //   this.authService
    //     .isAuthenticated()
    //     .pipe(distinctUntilChanged())
    //     .subscribe((isAuth) => (this.logged = isAuth))
    // );
  }

  ngOnDestroy() {
    // this.subscriptionsList.forEach((s) => s.unsubscribe());
  }
}
