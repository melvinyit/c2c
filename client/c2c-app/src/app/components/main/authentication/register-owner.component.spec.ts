import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterOwnerComponent } from './register-owner.component';

describe('RegisterOwnerComponent', () => {
  let component: RegisterOwnerComponent;
  let fixture: ComponentFixture<RegisterOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
