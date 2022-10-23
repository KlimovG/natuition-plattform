import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreComponent } from './components/core/core.component';
import { SharedModule } from '../../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { CoreRoutingModule } from './core.routing.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { GraphQLService } from '../../shared/modules/graphQL/graphQL.service';

@NgModule({
  declarations: [CoreComponent, HeaderComponent],
  exports: [CoreComponent, HeaderComponent],
  imports: [CommonModule, SharedModule, CoreRoutingModule, DashboardModule],
  providers: [GraphQLService],
})
export class CoreModule {}
