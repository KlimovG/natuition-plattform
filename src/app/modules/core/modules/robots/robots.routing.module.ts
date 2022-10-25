import { RouterModule, Routes } from '@angular/router';
import { RobotsComponent } from './components/robots/robots.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RobotsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RobotsRoutingModule {}
