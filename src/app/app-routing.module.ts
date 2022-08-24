import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main/main-page.component';
import { SmartLoginComponent } from './pages/main/components/smart/smart-login/smart-login.component';
import { LogoComponent } from './shared/components/logo/logo.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: MainPageComponent,
    children: [
      {
        path: 'login',
        component: SmartLoginComponent,
      },
      {
        path: 'registration',
        component: SmartLoginComponent,
      },
    ],
  },
  {
    path: 'test',
    component: LogoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
