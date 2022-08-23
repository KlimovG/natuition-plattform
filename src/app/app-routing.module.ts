import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from "./pages/main/main-page.component";
import {LogoComponent} from "./shared/components/logo/logo.component";

const routes: Routes = [
  {path: '', component: MainPageComponent, children: [
      {path: 'login', component: LogoComponent},
      {path: 'registration', component: LogoComponent},
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
