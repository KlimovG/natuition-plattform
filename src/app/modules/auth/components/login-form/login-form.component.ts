import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBaseComponent } from '../../../../shared/components/form-components/base/form-base/form-base.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent extends FormBaseComponent implements OnInit {
  @Output() save = new EventEmitter();
  constructor() {
    super();
  }

  ngOnInit(): void {}
}