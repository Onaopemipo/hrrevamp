import { TestBed } from '@angular/core/testing';

import { AssetSubTypeService } from './asset-sub-type.service';

describe('AssetSubTypeService', () => {
  let service: AssetSubTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetSubTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
