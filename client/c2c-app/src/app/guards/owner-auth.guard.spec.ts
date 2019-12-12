import { TestBed, async, inject } from '@angular/core/testing';

import { OwnerAuthGuard } from './owner-auth.guard';

describe('OwnerAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OwnerAuthGuard]
    });
  });

  it('should ...', inject([OwnerAuthGuard], (guard: OwnerAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
