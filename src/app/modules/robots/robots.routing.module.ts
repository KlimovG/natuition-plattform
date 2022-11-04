import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SmartRobotsComponent } from './components/smart/smart-robots.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SmartRobotsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RobotsRoutingModule {}
