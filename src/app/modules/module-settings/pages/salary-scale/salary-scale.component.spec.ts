import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryScaleComponent } from './salary-scale.component';

describe('SalaryScaleComponent', () => {
  let component: SalaryScaleComponent;
  let fixture: ComponentFixture<SalaryScaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryScaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
