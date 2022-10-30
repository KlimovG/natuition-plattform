import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RobotsComponent } from './components/robots/robots.component';
import { RobotsRoutingModule } from './robots.routing.module';

@NgModule({
  declarations: [RobotsComponent],
  imports: [CommonModule, RobotsRoutingModule],
})
export class RobotsModule {}
