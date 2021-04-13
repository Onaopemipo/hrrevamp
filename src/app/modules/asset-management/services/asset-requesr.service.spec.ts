import { TestBed } from '@angular/core/testing';

import { AssetRequesrService } from './asset-requesr.service';

describe('AssetRequesrService', () => {
  let service: AssetRequesrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetRequesrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
