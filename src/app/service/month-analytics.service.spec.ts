import { TestBed } from '@angular/core/testing';

import { MonthAnalyticsService } from './month-analytics.service';

describe('MonthAnalyticsService', () => {
  let service: MonthAnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthAnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
