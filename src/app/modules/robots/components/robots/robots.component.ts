import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IButtonsData } from '../../../../shared/components/buttons-list/buttons-list.component';

@Component({
  selector: 'app-robots-list',
  template: `
    <app-title-section title="robots.title"></app-title-section>
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
}
