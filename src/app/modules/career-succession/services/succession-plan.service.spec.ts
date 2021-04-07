import { TestBed } from '@angular/core/testing';

import { SuccessionPlanService } from './succession-plan.service';

describe('SuccessionPlanService', () => {
  let service: SuccessionPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuccessionPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
