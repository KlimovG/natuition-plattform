import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {SmartMapComponent} from "./components/smart/smart-map.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SmartMapComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapRoutingModule {}
