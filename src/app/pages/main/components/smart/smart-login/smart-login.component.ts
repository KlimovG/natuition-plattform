import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputListModel } from '../../../../../shared/components/form-components/form-list-components/input-list/input-list.model';

@Component({
  selector: 'app-smart-login-form',
  templateUrl: './smart-login.component.html',
})
export class SmartLoginComponent implements OnInit {
  form!: FormGroup;
  textData!: InputListModel[];
  private preffix = 'login';
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.initData();
    this.textData = this.initText();
  }

  initData(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.nullValidator]],
    });
  }

  initText(): InputListModel[] {
    const keysOfForm = ['email', 'password'];
    let result: InputListModel[] = [];
    keysOfForm.forEach((value) =>
      result.push({
        placeholder: `${this.preffix}.${value}`,
        controlName: value,
      })
    );
    return result;
    // Object.entries(this.loginObject).map((value) => console.log(value));
  }
}
