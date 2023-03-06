import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { UserImageComponent } from './components/user/user-image/user-image.component';
import { UserLabelComponent } from './components/user/user-label/user-label.component';
import { GraphQLModule } from './modules/graphQL/graphQL.module';
import { ButtonsListComponent } from './components/buttons-list/buttons-list.component';
import { TitleSectionComponent } from './components/title-section/title-section.component';
import { TitleColumnComponent } from './components/title-column/title-column.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    GraphQLModule,
    CommonModule,
    NgxSpinnerModule,
    FontAwesomeModule,
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
    UserImageComponent,
    UserLabelComponent,
    ButtonsListComponent,
    TitleSectionComponent,
    TitleColumnComponent,
    SpinnerComponent,
    HeaderComponent,
  ],
  exports: [
    NgxSpinnerModule,
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    GraphQLModule,
    ButtonPrimaryComponent,
    ButtonSecondaryComponent,
    LogoComponent,
    InputTextComponent,
    InputListComponent,
    FormBaseComponent,
    UserLabelComponent,
    UserImageComponent,
    ButtonsListComponent,
    TitleSectionComponent,
    TitleColumnComponent,
    SpinnerComponent,
    ButtonMainComponent,
    FontAwesomeModule,
    HeaderComponent,
  ],
  providers: [TranslationService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
