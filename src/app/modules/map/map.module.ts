import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { MapEffects } from './state/map.effects';
import { SmartMapComponent } from './components/smart/smart-map.component';
import { MapContainerComponent } from './components/map-container/map-container.component';
import { MapRoutingModule } from './map-routing.module';

@NgModule({
  declarations: [SmartMapComponent, MapContainerComponent],
  exports: [SmartMapComponent],
  imports: [
    CommonModule,
    MapRoutingModule,
    EffectsModule.forFeature([MapEffects]),
  ],
})
export class MapModule {}
