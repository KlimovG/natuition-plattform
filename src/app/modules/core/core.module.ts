import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CoreComponent } from './components/core/core.component';
import { SharedModule } from '../../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { CoreRoutingModule } from './core.routing.module';
import { SessionsComponent } from './components/sessions/sessions.component';
import { MapComponent } from './components/map/map.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { MapModule } from '../map/map.module';
import { SessionsModule } from '../sessions/sessions.module';
import { RobotsModule } from '../robots/robots.module';
import { StatisticModule } from '../statistic/statistic.module';
import { NavbarBottomComponent } from './components/navbar-bottom/navbar-bottom.component';

@NgModule({
  declarations: [
    CoreComponent,
    HeaderComponent,
    SessionsComponent,
    MapComponent,
    StatisticComponent,
    NavbarBottomComponent,
  ],
  exports: [CoreComponent, HeaderComponent],
  imports: [
    SharedModule,
    CoreRoutingModule,
    MapModule,
    SessionsModule,
    RobotsModule,
    StatisticModule,
  ],
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
