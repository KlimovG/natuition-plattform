import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-main',
  templateUrl: './button-main.component.html',
  styleUrls: ['./button-main.component.scss'],
})
export class ButtonMainComponent {
  @Input() routerLink: any[] | string | null | undefined;
  @Input() text: string;
  @Input() css: string;
  @Input() formName: string;
  @Input() disabled: boolean;
  @Output() click = new EventEmitter<any>();
}
