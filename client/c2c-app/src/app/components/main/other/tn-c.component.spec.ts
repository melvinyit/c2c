import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TnCComponent } from './tn-c.component';

describe('TnCComponent', () => {
  let component: TnCComponent;
  let fixture: ComponentFixture<TnCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TnCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TnCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
