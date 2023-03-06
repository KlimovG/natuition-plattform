import { Component, Input } from '@angular/core';
import { ChartData } from '../../models/chart-data.model';
import { StatisticModel } from '../../models/statistic.model';

@Component({
  selector: 'app-statistic',
  template: `
    <app-title-section
      [title]="translationPrefix + 'title'"
    ></app-title-section>
    <div
      class="flex flex-wrap items-stretch justify-between self-stretch"
      *ngIf="!isDataLoading"
    >
      <div class="md:w-1/2 w-full mb-3 md:mb-0">
        <app-type-plants
          *ngIf="chartData"
          [labels]="chartData.labels"
          [data]="chartData.data"
          [translationPrefix]="translationPrefix + 'types.'"
        ></app-type-plants>
      </div>
      <div class="md:w-1/2 w-full">
        <app-robot-stats
          *ngIf="stats"
          [stats]="stats"
          [translationPrefix]="translationPrefix + 'stats.'"
        ></app-robot-stats>
      </div>
    </div>
  `,
})
export class StatisticComponent {
  @Input() translationPrefix: string;
  @Input() chartData: ChartData;
  @Input() stats: StatisticModel;
  @Input() isDataLoading: boolean;
}
