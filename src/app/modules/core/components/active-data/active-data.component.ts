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
  @Input() robot: string;
  @Input() session: string;
  icon = faHome;
  showHome = false;
  translationPrefix = 'activeData.';
  constructor(private store: Store<State>) {}

  signOut(): void {
    this.store.dispatch(new LogOut());
  }

  toggleHome(): void {
    this.showHome = !this.showHome;
  }
}
