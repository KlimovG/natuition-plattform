import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home-page.component';
import { SmartLoginComponent } from './pages/home/components/smart/smart-login/smart-login.component';
import { SmartRegistrationFormComponent } from './pages/home/components/smart/smart-registration-form/smart-registration-form.component';
import { MainPageComponent } from './pages/main/main-page.component';

const routes: Routes = [
  //TODO: remove redirect, after mage registration and login form
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePageComponent,
    children: [
      {
        path: 'registration',
        component: SmartRegistrationFormComponent,
      },
      {
        path: 'login',
        component: SmartLoginComponent,
      },
    ],
  },
  {
    path: 'main',
    component: MainPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
