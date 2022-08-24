import { Component, OnInit } from '@angular/core';
import { FormBase } from '../../../../shared/models/form-base';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent extends FormBase implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
