import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPlanComponent } from './vendor-plan.component';

describe('VendorPlanComponent', () => {
  let component: VendorPlanComponent;
  let fixture: ComponentFixture<VendorPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
