import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './modules/auth/pages/home/auth-page.component';
import { SmartLoginFormComponent } from './modules/auth/components/smart/smart-login-form/smart-login-form.component';
import { SmartRegistrationFormComponent } from './modules/auth/components/smart/smart-registration-form/smart-registration-form.component';

const routes: Routes = [
  //TODO: remove redirect, after complete registration and login form
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: AuthPageComponent,
    children: [
      {
        path: 'registration',
        component: SmartRegistrationFormComponent,
      },
      {
        path: 'login',
        component: SmartLoginFormComponent,
      },
    ],
  },

  {
    path: 'core',
    loadChildren: () =>
      import('./modules/core/core.module').then((m) => m.CoreModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
