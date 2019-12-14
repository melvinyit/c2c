import { TestBed } from '@angular/core/testing';

import { NewsletterServiceService } from './newsletter-service.service';

describe('NewsletterServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewsletterServiceService = TestBed.get(NewsletterServiceService);
    expect(service).toBeTruthy();
  });
});
