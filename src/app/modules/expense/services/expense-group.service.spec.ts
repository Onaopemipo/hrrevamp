import { TestBed } from '@angular/core/testing';

import { ExpenseGroupService } from './expense-group.service';

describe('ExpenseGroupService', () => {
  let service: ExpenseGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpenseGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
