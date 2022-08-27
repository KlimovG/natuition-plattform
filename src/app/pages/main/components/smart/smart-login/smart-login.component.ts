import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputListModel } from '../../../../../shared/components/form-components/form-list-components/input-list/input-list.model';
import { LoginFormOutput } from '../../../models/login-form.model';
import { FormBaseComponent } from '../../../../../shared/components/form-components/base/form-base/form-base.component';

@Component({
  selector: 'app-smart-login-form',
  templateUrl: './smart-login.component.html',
})
export class SmartLoginComponent extends FormBaseComponent implements OnInit {
  textData!: InputListModel[];
  loginFormObject = new LoginFormOutput();
  private prefix = 'login';
  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.form = this.initData();
    this.textData = this.initText(this.form);
  }

  initData(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.nullValidator]],
    });
  }

  initText(form: FormGroup): InputListModel[] {
    const keysOfForm = Object.keys(form.controls);
    let result: InputListModel[] = [];
    keysOfForm.forEach((value) =>
      result.push({
        placeholder: `${this.prefix}.${value}`,
        controlName: value,
      })
    );
    return result;
  }
}
