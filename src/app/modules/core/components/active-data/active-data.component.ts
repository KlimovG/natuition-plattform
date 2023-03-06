import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../../state';
import { LogOut } from '../../../auth/state/auth.actions';
import { faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-active-data',
  templateUrl: './active-data.component.html',
})
export class ActiveDataComponent {
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
