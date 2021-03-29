import { TestBed } from '@angular/core/testing';

import { NineBoxGridService } from './nine-box-grid.service';

describe('NineBoxGridService', () => {
  let service: NineBoxGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NineBoxGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
