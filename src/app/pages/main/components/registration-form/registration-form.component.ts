import { Component, OnInit } from '@angular/core';
import { FormBase } from '../../../../shared/models/form-base';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent extends FormBase implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
