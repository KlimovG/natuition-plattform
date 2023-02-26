import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-primary',
  templateUrl: './button-primary.component.html',
  styleUrls: ['./button-primary.component.scss'],
})
export class ButtonPrimaryComponent {
  @Input() link!: any[] | string | null | undefined;
  @Input() text: string = 'btn';
  @Input() formName: string;
  @Input() loading: boolean;
  @Input() disabled: boolean;
  @Output() click = new EventEmitter<any>();
  constructor() {}
}
