import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IButtonsData } from '../../../../shared/components/buttons-list/buttons-list.component';
import { LogOut } from '../../../auth/state/auth.actions';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { State } from '../../../../state';

@Component({
  selector: 'app-robots-list',
  template: `
    <div class="flex justify-between items-end sticky top-0 bg-gray-white pb-3">
      <app-title-section title="robots.title"></app-title-section>

      <app-header></app-header>
    </div>

    <app-buttons-list
      *ngIf="!isRobotListLoading"
      class="overflow-y-scroll max-h-full block"
      [buttonsData]="robots"
      [active]="activeRobot"
      (onClick)="onRobotClick.emit($event)"
    ></app-buttons-list>

    <app-spinner
      name="robotList"
      [showSpinner]="isRobotListLoading"
      size="large"
    ></app-spinner>
  `,
  styleUrls: ['./robots.component.scss'],
})
export class RobotsComponent {
  @Input() isRobotListLoading: boolean = false;
  @Input() robots: IButtonsData[];
  @Input() activeRobot: string;
  @Output() onRobotClick = new EventEmitter<string>();
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
