import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateleavePlanComponent } from './createleave-plan.component';

describe('CreateleavePlanComponent', () => {
  let component: CreateleavePlanComponent;
  let fixture: ComponentFixture<CreateleavePlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateleavePlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateleavePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
