import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageCarComponent } from './admin-manage-car.component';

describe('AdminManageCarComponent', () => {
  let component: AdminManageCarComponent;
  let fixture: ComponentFixture<AdminManageCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminManageCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManageCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
