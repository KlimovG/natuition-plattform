import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-base',
  template: '',
})
export class FormBaseComponent {
  @Input() form!: FormGroup;
  @Input() data!: any;
  @Output() onSubmit = new EventEmitter<any>();
}
