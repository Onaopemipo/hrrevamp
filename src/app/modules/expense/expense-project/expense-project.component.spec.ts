import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseProjectComponent } from './expense-project.component';

describe('ExpenseProjectComponent', () => {
  let component: ExpenseProjectComponent;
  let fixture: ComponentFixture<ExpenseProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
