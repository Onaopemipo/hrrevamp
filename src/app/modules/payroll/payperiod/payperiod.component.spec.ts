import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayperiodComponent } from './payperiod.component';

describe('PayperiodComponent', () => {
  let component: PayperiodComponent;
  let fixture: ComponentFixture<PayperiodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayperiodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayperiodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
