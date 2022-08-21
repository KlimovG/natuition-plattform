import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {httpLoaderFactory} from "./shared/i18n/http-loader-factory";
import { ButtonPrimaryComponent } from './shared/components/buttons/button-primary/button-primary.component';
import { ButtonSecondaryComponent } from './shared/components/buttons/button-secondary/button-secondary.component';
import { StoreModule } from '@ngrx/store';
import {metaReducers, reducers} from "./state";
import {environment} from "../environments/environment";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {EffectsModule} from "@ngrx/effects";
import {TranslationService} from "./shared/i18n/translation.service";
import { MainPageComponent } from './pages/main/main-page.component';
import { LogoComponent } from './shared/components/logo/logo.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonPrimaryComponent,
    ButtonSecondaryComponent,
    MainPageComponent,
    LogoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 100 }) : [],
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [
    TranslationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
