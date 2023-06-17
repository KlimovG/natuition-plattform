import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-column',
  template: ` <h3 class="Montserrat-SemiBold text-xl text-center mb-1.5 noselect">
    {{ title | translate }}
  </h3>`,
})
export class TitleColumnComponent {
  @Input() title: string;
}
