import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-robot-stats',
  template: `
    <app-title-column [title]="translationPrefix + 'title'"> </app-title-column>
    <app-stat-item></app-stat-item>
  `,
})
export class RobotStatsComponent implements OnInit {
  @Input() translationPrefix: string;

  constructor() {}

  ngOnInit(): void {}
}
