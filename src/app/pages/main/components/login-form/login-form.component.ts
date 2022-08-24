import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputListModel } from '../../../../shared/components/form-components/form-list-components/input-list/input-list.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() data!: InputListModel[];
  constructor() {}

  ngOnInit(): void {}
}
