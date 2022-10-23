import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CoreComponent } from './components/core/core.component';
import { SharedModule } from '../../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { CoreRoutingModule } from './core.routing.module';
import { RobotsComponent } from './components/robots/robots.component';
import { SessionsComponent } from './components/sessions/sessions.component';
import { MapComponent } from './components/map/map.component';
import { StatisticComponent } from './components/statistic/statistic.component';

@NgModule({
  declarations: [
    CoreComponent,
    HeaderComponent,
    RobotsComponent,
    SessionsComponent,
    MapComponent,
    StatisticComponent,
  ],
  exports: [CoreComponent, HeaderComponent],
  imports: [SharedModule, CoreRoutingModule],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}

export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(
      `${moduleName} has already been loaded. Import Core modules in the AppModule only.`
    );
  }
}
