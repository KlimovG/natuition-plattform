import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-robots-list',
  template: `
    <app-section-title title="robots.title"> </app-section-title>
    <app-buttons-list
      [buttonsData]="robots"
      [active]="activeRobot"
      (onClick)="onRobotClick.emit($event)"
    >
    </app-buttons-list>
  `,
  styleUrls: ['./robots.component.scss'],
})
export class RobotsComponent implements OnInit {
  @Input() robots: string[] | null;
  @Input() activeRobot: string;
  @Output() onRobotClick = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}
}
