import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { State } from '../../../../state';
import { Store } from '@ngrx/store';
import { ChartData } from '../../models/chart-data.model';
import {
  isStatisticLoading,
  selectChartData,
  selectStatistic,
} from '../../state/statistic.reducer';
import { StatisticModel } from '../../models/statistic.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { OpenNotification } from '../../../../shared/modules/notification/state/notification.actions';

@Component({
  selector: 'app-smart-statistic',
  template: `<app-statistic
    class="relative"
    [isDataLoading]="isDataLoading$ | async"
    [chartData]="chartData$ | async"
    [stats]="robotStats$ | async"
    [translationPrefix]="translationPrefix"
  ></app-statistic>`,
})
export class SmartStatisticComponent implements OnInit, OnDestroy {
  translationPrefix = 'statistic.';
  activeSession$: Observable<string>;
  robotStats$: Observable<StatisticModel>;
  chartData$: Observable<ChartData>;
  isDataLoading$: Observable<boolean>;
  counter = 0;

  private subscriptionsList: Subscription[] = [];

  constructor(
    private store: Store<State>,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.isDataLoading$ = this.store.select(isStatisticLoading());
    this.subscriptionsList.push(
      // this.store.select(selectActiveSession()).subscribe((session) => {
      //   if (session) {
      //     this.store.dispatch(new GetStatistic(session));
      //   }
      // }),
      this.isDataLoading$.subscribe((value) => {
        value ? this.spinner.show('statistic') : this.spinner.hide('statistic');
      })
    );
    this.chartData$ = this.store.select(selectChartData());
    this.robotStats$ = this.store.select(selectStatistic()).pipe(
      map(({ voltage, totalNumber, duration }) => ({
        voltage,
        totalNumber,
        duration,
      }))
    );
  }
  ngOnDestroy() {
    this.subscriptionsList.forEach((s) => s.unsubscribe());
  }

  openNotification() {
    ++this.counter;
    this.store.dispatch(new OpenNotification(`test ${this.counter}`));
  }
}
