import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from "./pages/main/main-page.component";
import {ButtonPrimaryComponent} from "./shared/components/button/buttons/button-primary/button-primary.component";

const routes: Routes = [
  {path: '', component: MainPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
