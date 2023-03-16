import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StatisticModel } from '../../models/statistic.model';

@Component({
  selector: 'app-robot-stats',
  template: `
    <div class="h-full flex flex-col align-top">
      <app-title-column [title]="translationPrefix + 'title'">
      </app-title-column>
      <div class="flex-col mb-4">
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
      </div>
      <div class="mt-auto flex justify-center">
        <app-button-secondary
          class="min-w-stat"
          [fullWidth]="true"
          [text]="translationPrefix + 'report'"
          (click)="onReportClick.emit($event)"
        ></app-button-secondary>
      </div>
    </div>
  `,
})
export class RobotStatsComponent {
  @Input() translationPrefix: string;
  @Input() stats: StatisticModel;
  @Output() onReportClick = new EventEmitter<any>();
}
