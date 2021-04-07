import { TestBed } from '@angular/core/testing';

import { KeyResultAreaService } from './key-result-area.service';

describe('KeyResultAreaService', () => {
  let service: KeyResultAreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyResultAreaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
