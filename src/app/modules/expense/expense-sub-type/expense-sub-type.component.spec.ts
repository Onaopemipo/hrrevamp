import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseSubTypeComponent } from './expense-sub-type.component';

describe('ExpenseSubTypeComponent', () => {
  let component: ExpenseSubTypeComponent;
  let fixture: ComponentFixture<ExpenseSubTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseSubTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseSubTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
