import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../../state';
import { LogOut } from '../../../auth/state/auth.actions';
import { faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input() userName: string;
  icon = faHome;
  showHome = false;
  constructor(private store: Store<State>) {}

  signOut() {
    this.store.dispatch(new LogOut());
  }
  toggleHome() {
    this.showHome = !this.showHome;
  }
}
