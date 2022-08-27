import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonPrimaryComponent } from './components/buttons/button-primary/button-primary.component';
import { ButtonSecondaryComponent } from './components/buttons/button-secondary/button-secondary.component';
import { LogoComponent } from './components/logo/logo.component';
import { TranslationService } from './i18n/translation.service';
import { TranslateModule } from '@ngx-translate/core';
import { InputBaseComponent } from './components/form-components/base/input-base/input-base.component';
import { InputTextComponent } from './components/form-components/input-components/input-text/input-text.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputListComponent } from './components/form-components/form-list-components/input-list/input-list.component';
import { ButtonMainComponent } from './components/buttons/button-main/button-main.component';
import { FormBaseComponent } from './components/form-components/base/form-base/form-base.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  declarations: [
    ButtonPrimaryComponent,
    ButtonSecondaryComponent,
    LogoComponent,
    InputBaseComponent,
    InputTextComponent,
    InputListComponent,
    ButtonMainComponent,
    FormBaseComponent,
  ],
  exports: [
    CommonModule,
    ButtonPrimaryComponent,
    ButtonSecondaryComponent,
    LogoComponent,
    InputTextComponent,
    InputListComponent,
    FormBaseComponent,
    RouterModule,
  ],
  providers: [TranslationService],
})
export class SharedModule {}
