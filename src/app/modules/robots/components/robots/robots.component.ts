import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { faSeedling, faSignal } from '@fortawesome/free-solid-svg-icons';
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
          'text-primary-main': onlineFilter,
          'text-gray-200 ': !onlineFilter
        }"
      ></fa-icon>

      <app-title-section
        class="noselect"
        title="robots.title"
      ></app-title-section>

      <app-header *ngIf="showHeader"></app-header>
    </div>

    <div class="flex-col pr-2 overflow-y-scroll overflow-x-clip flex-1">
      <ng-container
        *ngFor="let robot of robots; let i = index; trackBy: trackById"
      >
        <div
          *ngIf="
            (onlineFilter &&
              ((robot.status$ | async) === status.ONLINE ||
                (robot.status$ | async) === status.ON ||
                (robot.status$ | async) === status.ACTIVE)) ||
            !onlineFilter
          "
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
            'shadow-robot-btn-active ': activeRobot === robot.serial
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
      </ng-container>
    </div>
    <app-spinner name="robotList" size="large"></app-spinner>
  `,
  styleUrls: ['./robots.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RobotsComponent {
  @Input() set isRobotListLoading(value: boolean) {
    value ? this.spinner.show('robotList') : this.spinner.hide('robotList');
    this.#isRobotListLoading = value;
  }
  @Input() robots: RobotModel[];
  @Input() activeRobot: string;
  @Input() showHeader: boolean;
  @Output() onRobotClick = new EventEmitter<RobotModel>();

  status = RobotStatus;
  faOnline = faSignal;
  faActive = faSeedling;
  #isRobotListLoading: boolean;
  #onlineFilter = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private spinner: NgxSpinnerService
  ) {}

  get isRobotListLoading(): boolean {
    return this.#isRobotListLoading;
  }

  set onlineFilter(value: boolean) {
    this.#onlineFilter = value;
  }

  get onlineFilter(): boolean {
    return this.#onlineFilter;
  }

  public filterClick() {
    this.onlineFilter = !this.onlineFilter;
    this.cdr.detectChanges();
  }

  trackById(index: number, button: RobotModel): string {
    const id = Number(button.serial.replace('SN', ''));
    return `${id}`;
  }
}
