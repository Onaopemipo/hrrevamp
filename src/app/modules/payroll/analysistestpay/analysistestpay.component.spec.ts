import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysistestpayComponent } from './analysistestpay.component';

describe('AnalysistestpayComponent', () => {
  let component: AnalysistestpayComponent;
  let fixture: ComponentFixture<AnalysistestpayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysistestpayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysistestpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
