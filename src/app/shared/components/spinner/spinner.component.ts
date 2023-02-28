import { Component, Input } from '@angular/core';
import { Size } from 'ngx-spinner/lib/ngx-spinner.enum';

@Component({
  selector: 'app-spinner',
  template: `
    <ngx-spinner
      [name]="name"
      [showSpinner]="showSpinner"
      [type]="type"
      [size]="size"
      [fullScreen]="fullScreen"
      [bdColor]="backDropColor"
      [color]="color"
    ></ngx-spinner>
  `,
})
export class SpinnerComponent {
  @Input() showSpinner: boolean;
  @Input() fullScreen: boolean = false;
  @Input() type = 'cog';
  @Input() name: string;
  @Input() color = '#256320';
  @Input() backDropColor = 'rgba(0,0,0,0)';
  @Input() size: Size = 'small';
}
