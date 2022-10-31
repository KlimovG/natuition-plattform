import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-robots-list',
  template: `
    <h2 class="Montserrat-Bold text-2xl text-left mb-2.5">
      {{ 'robots.title' | translate }}
    </h2>
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
