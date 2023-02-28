import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../../state';
import { LogOut } from '../../../auth/state/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input() userName: string = 'George Klimov';

  constructor(private store: Store<State>) {}

  signOut() {
    this.store.dispatch(new LogOut());
  }
}
