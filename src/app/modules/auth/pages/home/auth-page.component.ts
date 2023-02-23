import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Authenticate } from '../../state/auth.actions';

@Component({
  selector: 'app-home-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPageComponent implements OnInit {
  constructor(private router: Router, private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new Authenticate());
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
}
