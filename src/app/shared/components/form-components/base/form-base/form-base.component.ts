import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputListModel } from '../../form-list-components/input-list/input-list.model';

@Component({
  selector: 'app-form-base',
  template: '',
})
export class FormBaseComponent {
  @Input() form!: FormGroup;
  @Input() data!: any;
  @Output() onSubmit = new EventEmitter<any>();

  textData!: InputListModel[];
}
