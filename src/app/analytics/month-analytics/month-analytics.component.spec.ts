import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthAnalyticsComponent } from './month-analytics.component';

describe('MonthAnalyticsComponent', () => {
  let component: MonthAnalyticsComponent;
  let fixture: ComponentFixture<MonthAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthAnalyticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
