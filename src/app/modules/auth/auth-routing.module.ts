import { Routes } from '@angular/router';
import { AuthPageComponent } from './pages/home/auth-page.component';
import { SmartRegistrationFormComponent } from './components/smart/smart-registration-form/smart-registration-form.component';
import { SmartLoginComponent } from './components/smart/smart-login/smart-login.component';

const routes: Routes = [
  {
    path: '',
    component: AuthPageComponent,
    pathMatch: 'full',
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
];
