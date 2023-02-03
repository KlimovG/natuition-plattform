import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './modules/auth/pages/home/auth-page.component';
import { SmartLoginFormComponent } from './modules/auth/components/smart/smart-login-form/smart-login-form.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
    // component: AuthPageComponent,
    // children: [],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/core/core.module').then((m) => m.CoreModule),
    // canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
