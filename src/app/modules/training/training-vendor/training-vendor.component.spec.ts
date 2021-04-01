import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingVendorComponent } from './training-vendor.component';

describe('TrainingVendorComponent', () => {
  let component: TrainingVendorComponent;
  let fixture: ComponentFixture<TrainingVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
