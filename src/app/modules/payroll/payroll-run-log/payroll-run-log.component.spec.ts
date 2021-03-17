import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollRunLogComponent } from './payroll-run-log.component';

describe('PayrollRunLogComponent', () => {
  let component: PayrollRunLogComponent;
  let fixture: ComponentFixture<PayrollRunLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollRunLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollRunLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
