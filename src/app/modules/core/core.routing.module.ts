import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SmartRobotsComponent } from '../robots/components/smart/smart-robots.component';
import { SmartMapComponent } from '../map/components/smart/smart-map.component';
import { SmartCoreComponent } from './components/smart/smart-core.component';
import { SessionReportComponent } from './components/session-report/session-report.component';

const routes: Routes = [
  {
    path: '',
    component: SmartCoreComponent,
    children: [
      {
        path: '',
        redirectTo: 'robots',
        pathMatch: 'full',
      },
      {
        path: 'robots',
        component: SmartRobotsComponent,
      },
      {
        path: 'map',
        component: SmartMapComponent,
      },
      {
        path: 'report',
        component: SessionReportComponent,
      },
      {
        path: 'sessions',
        loadChildren: () =>
          import('../sessions/sessions.module').then((m) => m.SessionsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
