import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputListModel } from '../../../../../shared/components/form-components/form-list-components/input-list/input-list.model';
import { Store } from '@ngrx/store';
import { State } from '../../../../../state';
import { LogIn } from '../../../state/auth.actions';
import { BehaviorSubject, Observable } from 'rxjs';
import { isInitialAuth } from '../../../state/auth.reducer';

@Component({
  selector: 'app-smart-login-form-form',
  templateUrl: './smart-login-form.component.html',
})
export class SmartLoginFormComponent implements OnInit {
  form: FormGroup;
  textData: InputListModel[];
  isInitialAuth$: Observable<boolean>;
  isFormValid = new BehaviorSubject<boolean>(false);
  private prefix = 'login';

  constructor(private formBuilder: FormBuilder, private store: Store<State>) {}

  ngOnInit(): void {
    this.isInitialAuth$ = this.store.select(isInitialAuth);
    this.form = this.initFormEmpty();
    this.form.markAsTouched();
    this.textData = this.initText(this.form);
    this.form.valueChanges.subscribe(() =>
      this.isFormValid.next(this.form.valid)
    );
  }

  initFormEmpty(): FormGroup {
    return this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
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

  onSubmit(): void {
    const result = this.form.value;
    this.store.dispatch(new LogIn(result));
  }
}
