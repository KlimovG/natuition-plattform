import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChartData } from '../../models/chart-data.model';
import { StatisticModel } from '../../models/statistic.model';
import { NgxSpinnerService } from 'ngx-spinner';

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
          [labels]="chartData?.labels"
          [data]="chartData?.data"
          [translationPrefix]="translationPrefix + 'types.'"
        ></app-type-plants>
      </div>

      <div class="md:w-1/2 w-full">
        <app-robot-stats
          [stats]="stats"
          [translationPrefix]="translationPrefix + 'stats.'"
          (onReportClick)="onReportClick.emit($event)"
        ></app-robot-stats>
      </div>
    </div>

    <app-spinner name="statistik" size="medium"></app-spinner>
  `,
})
export class StatisticComponent {
  @Input() translationPrefix: string;
  @Input() chartData: ChartData;
  @Input() stats: StatisticModel;
  @Input() set isDataLoading(value: boolean) {
    value ? this.spinner.show('statistik') : this.spinner.hide('statistik');
    this._isDataLoading = value;
  }
  @Output() onReportClick = new EventEmitter<any>();
  get isDataLoading(): boolean {
    return this._isDataLoading;
  }
  _isDataLoading: boolean;

  constructor(private spinner: NgxSpinnerService) {}
}
