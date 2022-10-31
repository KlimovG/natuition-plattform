import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionsComponent } from './components/sessions/sessions.component';
import { SmartSessionsComponent } from './components/smart/smart-sessions.component';
import { SharedModule } from '../../shared/shared.module';
import { SessionsRoutingModule } from './sessions.routing.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/sessions.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SessionsEffects } from './state/sessions.effects';

@NgModule({
  declarations: [SessionsComponent, SmartSessionsComponent],
  imports: [
    CommonModule,
    SharedModule,
    SessionsRoutingModule,
    StoreModule.forFeature('sessions', reducer),
    EffectsModule.forFeature([SessionsEffects]),
  ],
})
export class SessionsModule {}
