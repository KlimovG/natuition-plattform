import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SmartSessionsComponent } from './components/smart/smart-sessions.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SmartSessionsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SessionsRoutingModule {}
