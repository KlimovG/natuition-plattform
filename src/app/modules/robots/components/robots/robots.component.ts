import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { faSeedling, faSignal } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { State } from '../../../../state';
import { NgxSpinnerService } from 'ngx-spinner';
import { RobotModel, RobotStatus } from '../../models/robot.model';

@Component({
  selector: 'app-robots-list',
  template: `
    <div class="flex justify-between items-end sticky top-0 bg-gray-white pb-3">
      <fa-icon
        class="ml-2"
        [icon]="faOnline"
        [fixedWidth]="true"
        (click)="filterClick()"
        [ngClass]="{
          'text-primary-main': _onlineFilter,
          'text-gray-200 ': !_onlineFilter
        }"
      ></fa-icon>

      <app-title-section
        class="noselect"
        title="robots.title"
      ></app-title-section>

      <app-header *ngIf="showHeader"></app-header>
    </div>

    <div class="flex-col pr-2 overflow-y-scroll overflow-x-clip flex-1">
      <div
        *ngFor="let robot of robots; let i = index; trackBy: trackById"
        class="
          flex
          flex-col
          items-center
          mb-2
          border
          shadow-robot-btn
          text-green-dark
          w-full
          bg-white
          Montserrat-SemiBold
          rounded-lg
          py-4
          px-4
          text-base
          transition
          duration-300"
        role="button"
        (click)="onRobotClick.emit(robot)"
        [ngClass]="{
          'shadow-robot-btn-active ': activeRobot === robot.serial,
          hidden: _onlineFilter && (robot.status$ | async) === status.OFF
        }"
      >
        <h3 class="noselect">{{ robot.serial }}</h3>
        <div class="flex justify-center">
          <fa-icon
            class="ml-2"
            [icon]="faOnline"
            [fixedWidth]="true"
            [ngClass]="{
              'text-primary-main':
                (robot.status$ | async) === status.ONLINE ||
                (robot.status$ | async) === status.ON ||
                (robot.status$ | async) === status.ACTIVE,
              'text-gray-200 ': (robot.status$ | async) === status.OFF
            }"
          ></fa-icon>
          <fa-icon
            class="ml-2 "
            [icon]="faActive"
            [fixedWidth]="true"
            [ngClass]="{
              'text-primary-main': (robot.status$ | async) === status.ACTIVE,
              'text-yellow-300': (robot.status$ | async) === status.ON,
              'text-gray-200': (robot.status$ | async) !== status.ACTIVE,
              'text-red-500':
                (robot.status$ | async) === status.PROBLEM ||
                (robot.status$ | async) === status.LEFT_AREA
            }"
          ></fa-icon>
        </div>
      </div>
    </div>
    <app-spinner name="robotList" size="large"></app-spinner>
  `,
  styleUrls: ['./robots.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RobotsComponent {
  @Input() set isRobotListLoading(value: boolean) {
    value ? this.spinner.show('robotList') : this.spinner.hide('robotList');
    this._isRobotListLoading = value;
  }
  @Input() robots: RobotModel[];
  @Input() activeRobot: string;
  @Input() showHeader: boolean;
  @Output() onRobotClick = new EventEmitter<RobotModel>();

  status = RobotStatus;
  showHome = false;
  faOnline = faSignal;
  faActive = faSeedling;
  _isRobotListLoading: boolean;
  _onlineFilter = false;

  constructor(
    private store: Store<State>,
    private spinner: NgxSpinnerService
  ) {}

  get isRobotListLoading() {
    return this._isRobotListLoading;
  }

  public filterClick() {
    this._onlineFilter = !this._onlineFilter;
  }

  trackById(index: number, button: RobotModel): string {
    const id = Number(button.serial.replace('SN', ''));
    return `${id}`;
  }
}
