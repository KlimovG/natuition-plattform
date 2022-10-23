import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartLoginFormComponent } from './smart-login-form.component';

describe('SmartLoginComponent', () => {
  let component: SmartLoginFormComponent;
  let fixture: ComponentFixture<SmartLoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmartLoginFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SmartLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
