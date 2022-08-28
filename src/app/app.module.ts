import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { httpLoaderFactory } from './shared/i18n/http-loader-factory';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './state';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { HomePageComponent } from './pages/home/home-page.component';
import { LoginFormComponent } from './pages/home/components/login-form/login-form.component';
import { RegistrationFormComponent } from './pages/home/components/registration-form/registration-form.component';
import { SharedModule } from './shared/shared.module';
import { SmartLoginComponent } from './pages/home/components/smart/smart-login/smart-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SmartRegistrationFormComponent } from './pages/home/components/smart/smart-registration-form/smart-registration-form.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard/dashboard-page.component';
import { CoreModule } from './modules/core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    SmartLoginComponent,
    SmartRegistrationFormComponent,
    DashboardPageComponent,
  ],
  imports: [
    RouterModule,
    AppRoutingModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    !environment.production
      ? StoreDevtoolsModule.instrument({ maxAge: 100 })
      : [],
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    SharedModule,
    ReactiveFormsModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
