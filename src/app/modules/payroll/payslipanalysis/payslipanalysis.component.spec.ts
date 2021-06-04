import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayslipanalysisComponent } from './payslipanalysis.component';

describe('PayslipanalysisComponent', () => {
  let component: PayslipanalysisComponent;
  let fixture: ComponentFixture<PayslipanalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayslipanalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayslipanalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
