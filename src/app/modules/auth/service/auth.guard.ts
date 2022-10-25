import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { State } from '../../../state';
import { merge, Observable, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

export interface IVerify {
  validate: boolean;
}
//TODO: Complete LoginGuard
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<State>,
    private router: Router,
    private authService: AuthService
  ) {}
  canActivate(): Observable<boolean> {
    const validFromApi$ = this.authService.isAuthenticated();
    const validFromState$ = this.store.pipe(
      select((state) => state.auth.isLogged),
      take(1)
    );
    return merge(validFromApi$, validFromState$).pipe(
      tap(async (authenticated) => {
        if (!authenticated) await this.router.navigate(['home/login']);
      })
    );
  }
}
