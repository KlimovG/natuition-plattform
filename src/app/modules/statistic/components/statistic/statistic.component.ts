import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ChartData } from '../../models/chart-data.model';
import { StatisticModel } from '../../models/statistic.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-statistic',
  template: `
    <div class="flex items-center justify-center mb-2">
      <app-title-section
        [title]="translationPrefix + 'title'"
      ></app-title-section>
    </div>
    <ng-container [ngSwitch]="chartType">
      <app-chart-pie
        *ngSwitchCase="'pie'"
        [isSmallScreen]="isSmallScreen$ | async"
        [translationPrefix]="translationPrefix"
        [chartData]="chartData"
        [stats]="stats"
        [isDataLoading]="isDataLoading"
      ></app-chart-pie>
    </ng-container>
    <!--    <app-chart-toggle-->
    <!--      class="self-end mx-auto -mb-4"-->
    <!--      (toggleType)="setChartType($event)"-->
    <!--    ></app-chart-toggle>-->

    <app-spinner name="statistik" size="medium"></app-spinner>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticComponent {
  @Input() isSmallScreen$: Observable<boolean>;
  @Input() translationPrefix: string;
  @Input() chartData: ChartData;
  @Input() stats: StatisticModel;
  @Input() set isDataLoading(value: boolean) {
    value ? this.spinner.show('statistik') : this.spinner.hide('statistik');
    this.#isDataLoading = value;
  }
  get isDataLoading(): boolean {
    return this.#isDataLoading;
  }
  #isDataLoading: boolean;
  #chartType: 'pie' | 'line' = 'pie';

  setChartType(type: 'pie' | 'line') {
    this.#chartType = type;
  }

  get chartType() {
    return this.#chartType;
  }
  constructor(private spinner: NgxSpinnerService) {}
}
