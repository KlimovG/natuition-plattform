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
  private prefix = 'login';
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.initFormEmpty();
    this.textData = this.initText(this.form);
  }

  initFormEmpty(): FormGroup {
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
