import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Authenticate, FirstAuthentication } from '../../state/auth.actions';
import { isInitialAuth, isLoadingUserAuth } from '../../state/auth.reducer';
import { State } from '../../../../state';
import {
  BehaviorSubject,
  firstValueFrom,
  Observable,
  Subscription,
} from 'rxjs';
import { SmartLoginFormComponent } from '../../components/smart/smart-login-form/smart-login-form.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home-page',
  templateUrl: './auth-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex',
  },
})
export class AuthPageComponent implements OnInit, OnDestroy {
  @ViewChild(SmartLoginFormComponent) loginForm: SmartLoginFormComponent;
  isUserLoading$: Observable<boolean>;
  buttonDisabled$ = new BehaviorSubject<boolean>(true);
  spinnerSubscription: Subscription;
  isInitialAuth$: Observable<boolean>;

  constructor(
    private router: Router,
    private store: Store<State>,
    private spinner: NgxSpinnerService
  ) {}

  async ngOnInit() {
    this.store.dispatch(new FirstAuthentication());
    this.isInitialAuth$ = this.store.select(isInitialAuth);
    this.isUserLoading$ = this.store.select(isLoadingUserAuth);
    const isLogged = await firstValueFrom(this.isUserLoading$);
    if (!isLogged) {
      this.store.dispatch(new Authenticate());
    }
    this.spinnerSubscription = this.isUserLoading$.subscribe((value) => {
      value ? this.spinner.show('mainBtn') : this.spinner.hide('mainBtn');
    });
  }

  ngOnDestroy() {
    this.spinnerSubscription.unsubscribe();
  }

  activeUrl(path: string): boolean {
    return this.router.url.includes(path);
  }

  get translationText(): string {
    switch (true) {
      case this.activeUrl('/login'):
        return 'login';
      default:
        return 'home';
    }
  }

  onActivate(component: any) {
    component.isFormValid.subscribe((data: boolean) => {
      this.buttonDisabled$.next(!data);
    });
  }
}
