import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseProjectActivityComponent } from './expense-project-activity.component';

describe('ExpenseProjectActivityComponent', () => {
  let component: ExpenseProjectActivityComponent;
  let fixture: ComponentFixture<ExpenseProjectActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseProjectActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseProjectActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
