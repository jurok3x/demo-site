import { TestBed } from '@angular/core/testing';

import { ExpensesAnalyticsService } from './expenses-analytics.service';

describe('ExpensesAnalyticsService', () => {
  let service: ExpensesAnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpensesAnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
