import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCarImageComponent } from './upload-car-image.component';

describe('UploadCarImageComponent', () => {
  let component: UploadCarImageComponent;
  let fixture: ComponentFixture<UploadCarImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadCarImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCarImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
