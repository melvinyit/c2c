import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProfileImageComponent } from './manage-profile-image.component';

describe('ManageProfileImageComponent', () => {
  let component: ManageProfileImageComponent;
  let fixture: ComponentFixture<ManageProfileImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageProfileImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProfileImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
