import { Component, Input, OnInit } from '@angular/core';
import { StatisticModel } from '../../models/statistic.model';

@Component({
  selector: 'app-robot-stats',
  template: `
    <div class="h-full flex flex-col align-top">
      <app-title-column [title]="translationPrefix + 'title'">
      </app-title-column>
      <div class="mt-2" *ngIf="!!stats?.voltage">
        <app-stat-item
          [label]="translationPrefix + 'voltage'"
          [value]="stats?.voltage?.toString() + 'V'"
        ></app-stat-item>
      </div>
      <div class="mt-2" *ngIf="!!stats?.duration">
        <app-stat-item
          class="mt-2"
          [label]="translationPrefix + 'duration'"
          [value]="stats?.duration"
        ></app-stat-item>
      </div>
      <div class="mt-2" *ngIf="!!stats?.totalNumber">
        <app-stat-item
          class="mt-2"
          [label]="translationPrefix + 'total'"
          [value]="stats?.totalNumber?.toString()"
        ></app-stat-item>
      </div>
      <div class="mt-2 flex justify-center self-end">
        <app-button-secondary
          [text]="translationPrefix + 'report'"
        ></app-button-secondary>
      </div>
    </div>
  `,
})
export class RobotStatsComponent implements OnInit {
  @Input() translationPrefix: string;
  @Input() stats: StatisticModel;
  constructor() {}

  ngOnInit(): void {}
}
