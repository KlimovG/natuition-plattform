import { Component, Input } from '@angular/core';
import { InputListModel } from './input-list.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-list',
  templateUrl: './input-list.component.html',
  styleUrls: ['./input-list.component.scss'],
})
export class InputListComponent {
  @Input() data: InputListModel[] = [];
  @Input() formGroup!: FormGroup;
  constructor() {}
}
