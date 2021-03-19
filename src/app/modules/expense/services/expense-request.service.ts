import { Injectable } from '@angular/core';
import { CrudService, ListResult } from 'app/_services/base-api.service';
import { of } from 'rxjs';

enum ACTIONS {EDIT = '1', DELETE = '2'}

export class MyExpenseRequest{}

export class ExpenseRequestFilter{}

@Injectable({
  providedIn: 'root'
})
export class ExpenseRequestService extends CrudService<MyExpenseRequest, ExpenseRequestFilter, MyExpenseRequest>{
  constructor() {
    super();
  }

  create(data: MyExpenseRequest) {
    return of();
  }

  delete() {
    return of();
  }

  fetch() {
    return of();
  }

  list(filter: ExpenseRequestFilter) {
    const data: ListResult<MyExpenseRequest> = {
      data: [{}],
      length: 10
    };
    return of(data);
  }
}
