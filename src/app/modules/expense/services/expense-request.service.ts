import { Injectable } from '@angular/core';
import { CrudService, ListResult } from 'app/_services/base-api.service';
import { AddUpdateExpenseServiceProxy, ExpenseDTO, FetchExpensesServiceProxy } from 'app/_services/service-proxies';
import { Observable, of, Subject } from 'rxjs';

enum ACTIONS {EDIT = '1', DELETE = '2'}

export class MyExpenseRequest extends ExpenseDTO{
  public constructor(expense: ExpenseDTO = new ExpenseDTO()) {
    super(expense);
  }
}

export class ExpenseRequestFilter {}

@Injectable({
  providedIn: 'root'
})
export class ExpenseRequestService extends CrudService<MyExpenseRequest, ExpenseRequestFilter, MyExpenseRequest>{
  constructor(
    private api_create: AddUpdateExpenseServiceProxy,
    private api_list: FetchExpensesServiceProxy,
  ) {
    super();
  }

  create(data: MyExpenseRequest) {
    return this.api_create.addUpdateExpense(data);
  }

  delete() {
    return of();
  }

  fetch() {
    return of();
  }

  list_api(filter: any): Observable<ListResult<MyExpenseRequest>> {
    throw 'Not Implemented';
  }
  toData(): MyExpenseRequest {
    throw 'Not Implemented';
  }

  list(filter: ExpenseRequestFilter) {
    const subject = new Subject<ListResult<MyExpenseRequest>>();
    this.api_list.fetchExpenses(0, 0, 0, 0, 0, null, null, null, 0, 1, 10).subscribe(data => {
      subject.next({data: data.result.map(expense => new MyExpenseRequest(expense)), length: data.totalCount});
      subject.complete();
    });
    return subject.asObservable();
  }
}
