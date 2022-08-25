import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepartSelectComponent } from './datepart-select.component';

describe('DatepartSelectComponent', () => {
  let component: DatepartSelectComponent;
  let fixture: ComponentFixture<DatepartSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatepartSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepartSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
