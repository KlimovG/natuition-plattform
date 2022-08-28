import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartRegistrationFormComponent } from './smart-registration-form.component';

describe('SmartRegistrationFormComponent', () => {
  let component: SmartRegistrationFormComponent;
  let fixture: ComponentFixture<SmartRegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartRegistrationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
