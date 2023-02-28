import { Component, Input, OnInit } from '@angular/core';
import { ChartData } from '../../models/chart-data.model';
import { StatisticModel } from '../../models/statistic.model';

@Component({
  selector: 'app-statistic',
  template: `
    <app-title-section
      [title]="translationPrefix + 'title'"
    ></app-title-section>
    <div class="flex lg:flex-nowrap items-stretch justify-between">
      <div class="lg:w-1/3">
        <app-type-plants
          *ngIf="chartData"
          [labels]="chartData.labels"
          [data]="chartData.data"
          [translationPrefix]="translationPrefix + 'types.'"
        ></app-type-plants>
      </div>
      <div class="lg:w-1/2">
        <app-robot-stats
          *ngIf="stats"
          [stats]="stats"
          [translationPrefix]="translationPrefix + 'stats.'"
        ></app-robot-stats>
      </div>
    </div>
  `,
})
export class StatisticComponent implements OnInit {
  @Input() translationPrefix: string;
  @Input() chartData: ChartData;
  @Input() stats: StatisticModel;
  constructor() {}

  ngOnInit(): void {}
}
