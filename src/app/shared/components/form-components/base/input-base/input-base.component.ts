import {Component, Input } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-input-base',
  template: ''
})
export class InputBaseComponent {
  @Input() id!: string;
  @Input() placeholder!: string;
  @Input() controlName!: string;
  @Input() formGroup!: FormGroup;
}
