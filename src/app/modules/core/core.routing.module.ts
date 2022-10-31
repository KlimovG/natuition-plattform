import { RouterModule, Routes } from '@angular/router';
import { CoreComponent } from './components/core/core.component';
import { NgModule } from '@angular/core';

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
        loadChildren: () =>
          import('../map/map.module').then((m) => m.MapModule),
        outlet: 'map',
      },
      {
        path: '',
        loadChildren: () =>
          import('../statistic/statistic.module').then(
            (m) => m.StatisticModule
          ),
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
