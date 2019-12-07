import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBookingHistoryComponent } from './check-booking-history.component';

describe('CheckBookingHistoryComponent', () => {
  let component: CheckBookingHistoryComponent;
  let fixture: ComponentFixture<CheckBookingHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckBookingHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckBookingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
