import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CoreComponent } from './components/core/core.component';
import { SharedModule } from '../../shared/shared.module';
import { ActiveDataComponent } from './components/active-data/active-data.component';
import { CoreRoutingModule } from './core.routing.module';
import { MapModule } from '../map/map.module';
import { SessionsModule } from '../sessions/sessions.module';
import { RobotsModule } from '../robots/robots.module';
import { StatisticModule } from '../statistic/statistic.module';
import { NavbarBottomComponent } from './components/navbar-bottom/navbar-bottom.component';
import { SmartCoreComponent } from './components/smart/smart-core.component';
import { SmartActiveDataComponent } from './components/smart/smart-active-data.component';
import { SmartSessionReportComponent } from './components/smart/smart-session-report.component';
import { SessionReportComponent } from './components/session-report/session-report.component';

@NgModule({
  declarations: [
    CoreComponent,
    ActiveDataComponent,
    NavbarBottomComponent,
    SmartCoreComponent,
    SmartActiveDataComponent,
    SmartSessionReportComponent,
    SessionReportComponent,
  ],
  exports: [CoreComponent, ActiveDataComponent],
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
