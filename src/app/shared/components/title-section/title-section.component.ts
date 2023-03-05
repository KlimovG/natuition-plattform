import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-section',
  template: ` <h2 class="Montserrat-Bold text-xl text-left">
    {{ title | translate }}
  </h2>`,
})
export class TitleSectionComponent {
  @Input() title: string;
}
