import { TestBed, async, inject } from '@angular/core/testing';

import { RenterAuthGuard } from './renter-auth.guard';

describe('RenterAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RenterAuthGuard]
    });
  });

  it('should ...', inject([RenterAuthGuard], (guard: RenterAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
