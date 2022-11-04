import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SmartStatisticComponent } from './components/smart/smart-statistic.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SmartStatisticComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatisticRoutingModule {}
