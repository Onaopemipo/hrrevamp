import { INamedStatus } from './../../../components/named-status/model';
import { IStatus, MyColor } from './../../../components/status/models';
import { Injectable } from '@angular/core';
import { CrudService, ListResult } from 'app/_services/base-api.service';
import { AddUpdateExpenseServiceProxy, ExpenseDTO, FetchExpensesServiceProxy } from 'app/_services/service-proxies';
import { Observable, of, Subject } from 'rxjs';

enum ACTIONS {EDIT = '1', DELETE = '2'}
enum APPROVAL_STATUS {
  PENDING = 1,
  APPROVED = 2,
  DECLINED = 3,
}

export class MyExpenseRequest extends ExpenseDTO implements IStatus, INamedStatus{
  public constructor(expense: ExpenseDTO = new ExpenseDTO()) {
    super(expense);
  }
  getNamedStatusLabel(): string {
    if (this.is_disbursed) return 'Disbursed';
    return 'No'
  }
  getNamedStatusColor(): MyColor {
    if (this.is_disbursed) return new MyColor(242, 153, 74);
    return new MyColor(242, 0, 74);
  }

  getStatusLabel() {
    if (this.log_status === APPROVAL_STATUS.APPROVED) return 'Approved';
    if (this.log_status === APPROVAL_STATUS.PENDING) return 'Pending';
    if (this.log_status === APPROVAL_STATUS.DECLINED) return 'Declined';
  }

getStatusColor() {
  if (this.log_status === APPROVAL_STATUS.PENDING) return new MyColor(242, 153, 74);
    if (this.log_status === APPROVAL_STATUS.APPROVED) return new MyColor(0, 153, 74);
    if (this.log_status === APPROVAL_STATUS.DECLINED) return new MyColor(242, 0, 74);
    return new MyColor(242, 0, 74);
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
