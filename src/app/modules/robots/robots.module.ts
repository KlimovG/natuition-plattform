import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RobotsComponent } from './components/robots/robots.component';
import { RobotsRoutingModule } from './robots.routing.module';
import { SmartRobotsComponent } from './components/smart/smart-robots.component';
import { RobotsService } from './service/robots.service';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/robots.reducer';
import { EffectsModule } from '@ngrx/effects';
import { RobotsEffects } from './state/robots.effects';
import { SharedModule } from '../../shared/shared.module';
import { AttachStatusPipe } from './pipe/attach-status.pipe';

@NgModule({
  declarations: [RobotsComponent, SmartRobotsComponent, AttachStatusPipe],
  imports: [
    CommonModule,
    RobotsRoutingModule,
    SharedModule,
    StoreModule.forFeature('robots', reducer),
    EffectsModule.forFeature([RobotsEffects]),
  ],
  providers: [RobotsService],
  exports: [SmartRobotsComponent],
})
export class RobotsModule {}
