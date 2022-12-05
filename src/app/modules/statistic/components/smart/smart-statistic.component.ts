import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { State } from '../../../../state';
import { Store } from '@ngrx/store';
import { selectActiveSession } from '../../../sessions/state/sessions.reducer';
import { GetStatistic } from '../../state/statistic.actions';
import { ChartData } from '../../models/chart-data.model';
import {
  selectChartData,
  selectStatistic,
} from '../../state/statistic.reducer';
import { StatisticModel } from '../../models/statistic.model';

@Component({
  selector: 'app-smart-statistic',
  template: `<app-statistic
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
  private subscriptionsList: Subscription[] = [];

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.subscriptionsList.push(
      this.store.select(selectActiveSession()).subscribe((session) => {
        if (session) {
          this.store.dispatch(new GetStatistic(session));
        }
      })
    );
    this.chartData$ = this.store.select(selectChartData());
    this.robotStats$ = this.store.select(selectStatistic()).pipe(
      map(({ voltage, totalNumber, duration }) => ({
        voltage,
        totalNumber,
        duration: `${duration?.hours} : ${duration?.minutes}`,
      }))
    );
  }
  ngOnDestroy() {
    this.subscriptionsList.forEach((s) => s.unsubscribe());
  }
}
