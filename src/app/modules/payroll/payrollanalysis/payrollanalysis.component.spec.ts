import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollanalysisComponent } from './payrollanalysis.component';

describe('PayrollanalysisComponent', () => {
  let component: PayrollanalysisComponent;
  let fixture: ComponentFixture<PayrollanalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollanalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollanalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
