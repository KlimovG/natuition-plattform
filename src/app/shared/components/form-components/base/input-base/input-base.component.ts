import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-text-base',
  template: '',
})
export class InputBaseComponent {
  @Input() id!: string;
  @Input() placeholder!: string;
  @Input() controlName!: string;
  @Input() formGroup!: FormGroup;

  get inputID(): string {
    return `${this.controlName}_${this.id}`;
  }
}
