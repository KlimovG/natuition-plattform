import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-section',
  template: `
    <h2
      class="Montserrat-Bold text-xl text-center w-full"
      [ngClass]="{ 'text-2xl': big }"
    >
      {{ title | translate }}
    </h2>
    <ng-content></ng-content>
  `,
  host: {
    class: 'w-full',
  },
})
export class TitleSectionComponent {
  @Input() title: string;
  @Input() big: boolean = false;
}
