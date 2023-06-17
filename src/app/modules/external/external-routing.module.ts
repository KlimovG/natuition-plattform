import { RouterModule, Routes } from '@angular/router';
import { ExternalVideoComponent } from './components/external-video.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ExternalVideoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExternalRoutingModule {}
