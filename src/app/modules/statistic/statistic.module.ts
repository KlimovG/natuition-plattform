import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { SmartStatisticComponent } from './components/smart/smart-statistic.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { StatisticRoutingModule } from './statistic-routing.module';
import { RobotStatsComponent } from './components/robot-stats/robot-stats.component';
import { TypePlantsComponent } from './components/type-plants/type-plants.component';
import { StatItemComponent } from './components/stat-item/stat-item.component';
import { StatItemListComponent } from './components/stat-item-list/stat-item-list.component';
import { NgChartsModule } from 'ng2-charts';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './state/statistic.reducer';
import { StatisticEffects } from './state/statistic.effects';

@NgModule({
  declarations: [
    SmartStatisticComponent,
    StatisticComponent,
    RobotStatsComponent,
    TypePlantsComponent,
    StatItemComponent,
    StatItemListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    StatisticRoutingModule,
    NgChartsModule,
    StoreModule.forFeature('statistic', reducer),
    EffectsModule.forFeature([StatisticEffects]),
  ],
  exports: [SmartStatisticComponent],
})
export class StatisticModule {}
