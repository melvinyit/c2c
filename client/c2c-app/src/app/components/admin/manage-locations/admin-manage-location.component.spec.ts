import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageLocationComponent } from './admin-manage-location.component';

describe('AdminManageLocationComponent', () => {
  let component: AdminManageLocationComponent;
  let fixture: ComponentFixture<AdminManageLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminManageLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManageLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
