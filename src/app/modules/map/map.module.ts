import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { MapEffects } from './state/map.effects';
import { SmartMapComponent } from './components/smart/smart-map.component';
import { MapContainerComponent } from './components/map-container/map-container.component';
import { MapRoutingModule } from './map-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/map.reducer';

@NgModule({
  declarations: [SmartMapComponent, MapContainerComponent],
  exports: [SmartMapComponent],
  imports: [
    CommonModule,
    MapRoutingModule,
    EffectsModule.forFeature([MapEffects]),
    StoreModule.forFeature('map', reducer),
    SharedModule,
  ],
})
export class MapModule {}
