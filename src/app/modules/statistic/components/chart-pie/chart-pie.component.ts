import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ChartData } from '../../models/chart-data.model';
import { StatisticModel } from '../../models/statistic.model';

@Component({
  selector: 'app-chart-pie',
  template: `
    <div
      class="flex flex-wrap items-stretch justify-between self-stretch"
      *ngIf="!isDataLoading"
    >
      <div class="md:w-1/2 w-full mb-3 md:mb-0">
        <app-type-plants
          [isSmallScreen]="isSmallScreen"
          [labels]="chartData?.labels"
          [data]="chartData?.data"
          [translationPrefix]="translationPrefix + 'types.'"
        ></app-type-plants>
      </div>

      <div class="md:w-1/2 w-full">
        <app-robot-stats
          [stats]="stats"
          [translationPrefix]="translationPrefix + 'stats.'"
        ></app-robot-stats>
      </div>
    </div>
  `,
  styles: [],
})
export class ChartPieComponent {
  @Input() isSmallScreen: boolean;
  @Input() translationPrefix: string;
  @Input() chartData: ChartData;
  @Input() stats: StatisticModel;
  @Input() isDataLoading: boolean;
}
