import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartLoginComponent } from './smart-login.component';

describe('SmartLoginComponent', () => {
  let component: SmartLoginComponent;
  let fixture: ComponentFixture<SmartLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
