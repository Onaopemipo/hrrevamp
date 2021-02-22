import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallBudgetComponent } from './overall-budget.component';

describe('OverallBudgetComponent', () => {
  let component: OverallBudgetComponent;
  let fixture: ComponentFixture<OverallBudgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverallBudgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
