import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DashboardPageComponent } from './pages/dashboard/dashboard-page.component';
import { DashboardRoutingModule } from './dashboard.routing.module';

@NgModule({
  declarations: [DashboardPageComponent],
  exports: [DashboardPageComponent],
  imports: [CommonModule, SharedModule, DashboardRoutingModule],
})
export class DashboardModule {}
