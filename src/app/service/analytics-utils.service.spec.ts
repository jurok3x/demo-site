import { TestBed } from '@angular/core/testing';

import { AnalyticsUtilsService } from './analytics-utils.service';

describe('AnalyticsUtilsService', () => {
  let service: AnalyticsUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalyticsUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
