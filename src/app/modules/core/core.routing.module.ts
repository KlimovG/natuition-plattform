import { RouterModule, Routes } from '@angular/router';
import { CoreComponent } from './components/core/core.component';
import { NgModule } from '@angular/core';
import { RobotsComponent } from './components/robots/robots.component';
import { SessionsComponent } from './components/sessions/sessions.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { MapComponent } from './components/map/map.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CoreComponent,
    children: [
      {
        path: '',
        component: RobotsComponent,
      },
      {
        path: '',
        component: MapComponent,
        outlet: 'map',
      },
      {
        path: '',
        component: StatisticComponent,
        outlet: 'statistic',
      },
      {
        path: '',
        component: SessionsComponent,
        outlet: 'sessions',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
