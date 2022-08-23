import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonPrimaryComponent } from './components/buttons/button-primary/button-primary.component';
import { ButtonSecondaryComponent } from './components/buttons/button-secondary/button-secondary.component';
import { LogoComponent } from './components/logo/logo.component';
import { TranslationService } from './i18n/translation.service';
import { TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from '../app-routing.module';
import { InputBaseComponent } from './components/form-components/base/input-base/input-base.component';
import { InputTextComponent } from './components/form-components/input-components/input-text/input-text.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    ButtonPrimaryComponent,
    ButtonSecondaryComponent,
    LogoComponent,
    InputBaseComponent,
    InputTextComponent,
  ],
  exports: [
    CommonModule,
    ButtonPrimaryComponent,
    ButtonSecondaryComponent,
    LogoComponent,
    InputTextComponent,
  ],
  providers: [TranslationService],
})
export class SharedModule {}
