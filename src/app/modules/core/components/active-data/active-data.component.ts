import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../../state';
import { LogOut } from '../../../auth/state/auth.actions';
import {
  faHome,
  faSeedling,
  faSignal,
} from '@fortawesome/free-solid-svg-icons';
import { RobotStatus } from '../../../robots/models/robot.model';

@Component({
  selector: 'app-active-data',
  templateUrl: './active-data.component.html',
})
export class ActiveDataComponent {
  @Input() userName: string;
  @Input() robot: string;
  @Input() session: string;
  @Input() isMobile: boolean;
  @Input() isTablet: boolean;
  @Input() status: RobotStatus = RobotStatus.OFF;
  predefinedStatus = RobotStatus;
  faOnline = faSignal;
  faActive = faSeedling;
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
