import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterOTPComponent } from './register-otp.component';

describe('RegisterOTPComponent', () => {
  let component: RegisterOTPComponent;
  let fixture: ComponentFixture<RegisterOTPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterOTPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterOTPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
