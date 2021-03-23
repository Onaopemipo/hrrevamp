import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeStepComponent } from './grade-step.component';

describe('GradeStepComponent', () => {
  let component: GradeStepComponent;
  let fixture: ComponentFixture<GradeStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
