import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IButtonsData } from '../../../../shared/components/buttons-list/buttons-list.component';

@Component({
  selector: 'app-robots-list',
  template: `
    <app-title-section title="robots.title"></app-title-section>
    <app-buttons-list
      class="overflow-y-scroll max-h-full block"
      [buttonsData]="robots"
      [active]="activeRobot"
      (onClick)="onRobotClick.emit($event)"
    ></app-buttons-list>
  `,
  styleUrls: ['./robots.component.scss'],
})
export class RobotsComponent {
  @Input() robots: IButtonsData[];
  @Input() activeRobot: string;
  @Output() onRobotClick = new EventEmitter<string>();
}
