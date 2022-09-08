import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthExpensesAnalyticsComponent } from './month-analytics.component';

describe('MonthAnalyticsComponent', () => {
  let component: MonthExpensesAnalyticsComponent;
  let fixture: ComponentFixture<MonthExpensesAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthExpensesAnalyticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthExpensesAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
