import { NgModule } from '@angular/core';
import { AuthPageComponent } from './pages/home/auth-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SmartLoginFormComponent } from './components/smart/smart-login-form/smart-login-form.component';
import { SharedModule } from '../../shared/shared.module';
import { AuthButtonsComponent } from './components/auth-buttons/auth-buttons.component';
import { AuthService } from './service/auth.service';
import { AuthRoutingModule } from './auth-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorInterceptor } from './service/auth-interceptor.interceptor';

@NgModule({
  declarations: [
    AuthPageComponent,
    AuthPageComponent,
    LoginFormComponent,
    SmartLoginFormComponent,
    AuthButtonsComponent,
  ],
  imports: [AuthRoutingModule, SharedModule],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor,
      multi: true,
    },
  ],
})
export class AuthModule {}
