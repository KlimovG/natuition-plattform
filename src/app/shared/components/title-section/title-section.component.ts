import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-section',
  template: ` <h2 class="Montserrat-Bold text-xl text-left mb-2.5">
    {{ title | translate }}
  </h2>`,
})
export class TitleSectionComponent {
  @Input() title: string;
}
