import { TestBed } from '@angular/core/testing';

import { SalaryScaleService } from './salary-scale.service';

describe('SalaryScaleService', () => {
  let service: SalaryScaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalaryScaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
