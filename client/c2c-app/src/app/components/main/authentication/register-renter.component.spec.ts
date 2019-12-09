import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRenterComponent } from './register-renter.component';

describe('RegisterRenterComponent', () => {
  let component: RegisterRenterComponent;
  let fixture: ComponentFixture<RegisterRenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterRenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterRenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
