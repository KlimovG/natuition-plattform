import { Component, OnInit } from '@angular/core';
import { combineLatestWith, interval } from 'rxjs';
import { TokenStorageService } from '../../../auth/service/token-storage.service';
import { State } from '../../../../state';
import { Store } from '@ngrx/store';
import { isLogged } from '../../../auth/state/auth.reducer';
import { AuthService } from '../../../auth/service/auth.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  host: {
    class: 'w-full h-full flex flex-col justify-between',
  },
})
export class CoreComponent implements OnInit {
  intervalForRefresh$ = interval(14 * 60 * 1000); // 14 minutes
  constructor(
    private tokenService: TokenStorageService,
    private store: Store<State>,
    private authService: AuthService
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
  }
}
