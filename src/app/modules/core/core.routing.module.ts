import { RouterModule, Routes } from '@angular/router';
import { CoreComponent } from './components/core/core.component';
import { NgModule } from '@angular/core';
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
        loadChildren: () =>
          import('../robots/robots.module').then((m) => m.RobotsModule),
        outlet: 'robots',
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
        loadChildren: () =>
          import('../sessions/sessions.module').then((m) => m.SessionsModule),
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
