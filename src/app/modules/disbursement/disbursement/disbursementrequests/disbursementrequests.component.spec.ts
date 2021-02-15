import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisbursementrequestsComponent } from './disbursementrequests.component';

describe('DisbursementrequestsComponent', () => {
  let component: DisbursementrequestsComponent;
  let fixture: ComponentFixture<DisbursementrequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisbursementrequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisbursementrequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
