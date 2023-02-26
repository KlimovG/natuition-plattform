import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Authenticate } from '../../state/auth.actions';
import { isLoadingUserAuth } from '../../state/auth.reducer';
import { State } from '../../../../state';
import { Observable } from 'rxjs';
import { SmartLoginFormComponent } from '../../components/smart/smart-login-form/smart-login-form.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPageComponent implements OnInit {
  @ViewChild(SmartLoginFormComponent) loginForm: SmartLoginFormComponent;
  isUserLoading$: Observable<boolean>;
  buttonDisabled: boolean;
  constructor(private router: Router, private store: Store<State>) {}

  ngOnInit() {
    this.store.dispatch(new Authenticate());
    this.isUserLoading$ = this.store.select(isLoadingUserAuth);
  }

  activeUrl(path: string): boolean {
    return this.router.url.includes(path);
  }

  get translationText(): string {
    switch (true) {
      case this.activeUrl('/login'):
        return 'login';
      // case this.activeUrl('/home/registration'):
      //   return 'registration';
      // case this.activeUrl('/home'):
      //   return 'home';
      default:
        return 'home';
    }
  }

  onActivate(component: any) {
    component.isFormValid.subscribe(
      (data: boolean) => (this.buttonDisabled = data)
    );
  }
}
