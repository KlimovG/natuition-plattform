import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IButtonsData } from '../../../../shared/components/buttons-list/buttons-list.component';
import { LogOut } from '../../../auth/state/auth.actions';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { State } from '../../../../state';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-robots-list',
  template: `
    <div class="flex justify-between items-end sticky top-0 bg-gray-white pb-3">
      <app-title-section title="robots.title"></app-title-section>

      <app-header *ngIf="showHeader"></app-header>
    </div>

    <app-buttons-list
      *ngIf="!isRobotListLoading"
      class="overflow-y-scroll max-h-full block"
      [buttonsData]="robots"
      [active]="activeRobot"
      (onClick)="onRobotClick.emit($event)"
    >
    </app-buttons-list>
    <app-spinner name="robotList" size="large"></app-spinner>
  `,
  styleUrls: ['./robots.component.scss'],
})
export class RobotsComponent {
  @Input() set isRobotListLoading(value: boolean) {
    value ? this.spinner.show('robotList') : this.spinner.hide('robotList');
    this._isRobotListLoading = value;
  }
  @Input() robots: IButtonsData[];
  @Input() activeRobot: string;
  @Input() showHeader: boolean;
  @Output() onRobotClick = new EventEmitter<string>();
  icon = faHome;
  showHome = false;
  constructor(
    private store: Store<State>,
    private spinner: NgxSpinnerService
  ) {}
  _isRobotListLoading: boolean;
  get isRobotListLoading() {
    return this._isRobotListLoading;
  }
  signOut() {
    this.store.dispatch(new LogOut());
  }
  toggleHome() {
    this.showHome = !this.showHome;
  }
}
