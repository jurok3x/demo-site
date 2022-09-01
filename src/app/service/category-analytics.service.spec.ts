import { TestBed } from '@angular/core/testing';

import { CategoryAnalyticsService } from './category-analytics.service';

describe('CategoryAnalyticsService', () => {
  let service: CategoryAnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryAnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
