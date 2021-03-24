import { TestBed } from '@angular/core/testing';

import { TalentPoolService } from './talent-pool.service';

describe('TalentPoolService', () => {
  let service: TalentPoolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TalentPoolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
