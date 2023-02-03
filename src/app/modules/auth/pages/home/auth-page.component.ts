import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPageComponent {
  constructor(private router: Router) {}

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
