import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputListModel } from '../../../../../shared/components/form-components/form-list-components/input-list/input-list.model';

@Component({
  selector: 'app-smart-registration-form',
  templateUrl: './smart-registration-form.component.html',
  styleUrls: ['./smart-registration-form.component.scss'],
})
export class SmartRegistrationFormComponent implements OnInit {
  form!: FormGroup;
  textData!: InputListModel[];
  private prefix = 'registration';

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.initFormEmpty();
    this.textData = this.initText(this.form);
  }

  initFormEmpty(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      passwordRepeat: ['', [Validators.required]],
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
