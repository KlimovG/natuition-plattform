import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartNotificationComponent } from './components/smart-notification.component';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/notification.reducer';
import { EffectsModule } from '@ngrx/effects';
import { NotificationEffects } from './state/notification.effects';

@NgModule({
  declarations: [SmartNotificationComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FontAwesomeModule,
    StoreModule.forFeature('notifications', reducer),
    EffectsModule.forFeature([NotificationEffects]),
  ],
  exports: [SmartNotificationComponent],
})
export class NotificationModule {}
