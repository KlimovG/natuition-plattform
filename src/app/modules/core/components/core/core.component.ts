import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/service/auth.service';
import { distinctUntilChanged, Subscription } from 'rxjs';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  host: {
    class: 'w-full h-full',
  },
})
export class CoreComponent implements OnInit, OnDestroy {
  logged: boolean = false;
  private subscriptionsList: Subscription[] = [];
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.subscriptionsList.push(
      this.authService
        .isAuthenticated()
        .pipe(distinctUntilChanged())
        .subscribe((isAuth) => (this.logged = isAuth))
    );
  }

  ngOnDestroy() {
    this.subscriptionsList.forEach((s) => s.unsubscribe());
  }
}
