import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonPrimaryComponent } from './shared/button/buttons/button-primary/button-primary.component';
import { ButtonSecondaryComponent } from './shared/button/buttons/button-secondary/button-secondary.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonPrimaryComponent,
    ButtonSecondaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
