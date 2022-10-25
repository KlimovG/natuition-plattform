import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './modules/auth/pages/home/auth-page.component';
import { SmartLoginFormComponent } from './modules/auth/components/smart/smart-login-form/smart-login-form.component';
import { SmartRegistrationFormComponent } from './modules/auth/components/smart/smart-registration-form/smart-registration-form.component';
import { AuthGuard } from './modules/auth/service/auth.guard';

const routes: Routes = [
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
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/core/core.module').then((m) => m.CoreModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
