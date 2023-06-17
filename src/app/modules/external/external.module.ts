import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ExternalVideoComponent } from './components/external-video.component';
import { ExternalRoutingModule } from './external-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ExternalVideoComponent],
  imports: [
    ExternalRoutingModule,
    CommonModule,
    NgOptimizedImage,
    SharedModule,
  ],
})
export class ExternalModule {}
