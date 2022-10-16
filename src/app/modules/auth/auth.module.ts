import { NgModule } from '@angular/core';
import { AuthPageComponent } from './pages/home/auth-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { SmartLoginFormComponent } from './components/smart/smart-login-form/smart-login-form.component';
import { SmartRegistrationFormComponent } from './components/smart/smart-registration-form/smart-registration-form.component';
import { SharedModule } from '../../shared/shared.module';
import { AuthButtonsComponent } from './components/auth-buttons/auth-buttons.component';

@NgModule({
  declarations: [
    AuthPageComponent,
    AuthPageComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    SmartLoginFormComponent,
    SmartRegistrationFormComponent,
    AuthButtonsComponent,
  ],
  imports: [SharedModule],
})
export class AuthModule {}
