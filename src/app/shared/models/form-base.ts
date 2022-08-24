import { EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

export class FormBase {
  @Input() form!: FormGroup;
  @Input() data!: any;
  @Output() onSubmit = new EventEmitter<any>();
}
