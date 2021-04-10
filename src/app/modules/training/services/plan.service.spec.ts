import { TestBed } from '@angular/core/testing';

import { TrainingPlanService } from './plan.service';

describe('PlanService', () => {
  let service: TrainingPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
