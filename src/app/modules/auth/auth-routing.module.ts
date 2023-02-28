import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './pages/home/auth-page.component';
import { SmartLoginFormComponent } from './components/smart/smart-login-form/smart-login-form.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: AuthPageComponent,
    children: [
      // TODO: registration, when it is needed
      // {
      //   path: 'registration',
      //   component: SmartRegistrationFormComponent,
      // },
      {
        path: 'login',
        component: SmartLoginFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
