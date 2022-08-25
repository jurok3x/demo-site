import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularExpensesComponent } from './popular-expenses.component';

describe('PopularExpensesComponent', () => {
  let component: PopularExpensesComponent;
  let fixture: ComponentFixture<PopularExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularExpensesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
