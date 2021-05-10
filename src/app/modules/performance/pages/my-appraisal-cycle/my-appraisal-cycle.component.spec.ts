import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAppraisalCycleComponent } from './my-appraisal-cycle.component';

describe('MyAppraisalCycleComponent', () => {
  let component: MyAppraisalCycleComponent;
  let fixture: ComponentFixture<MyAppraisalCycleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAppraisalCycleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAppraisalCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
