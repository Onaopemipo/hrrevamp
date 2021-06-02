import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollcontractComponent } from './payrollcontract.component';

describe('PayrollcontractComponent', () => {
  let component: PayrollcontractComponent;
  let fixture: ComponentFixture<PayrollcontractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollcontractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollcontractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
