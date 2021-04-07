import { Injectable } from '@angular/core';
import { CrudService, ListResult } from 'app/_services/base-api.service';
import { AddUpdateExpenseProjectServiceProxy, AddUpdateExpenseServiceProxy, FetchExpensesServiceProxy } from 'app/_services/service-proxies';
import { Subject } from 'rxjs';

export class MyExpenseReport {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExpenseReportService  extends CrudService<MyExpenseReport, {}, MyExpenseReport>{
  constructor(
    private create_api: AddUpdateExpenseServiceProxy,
    private list_api: FetchExpensesServiceProxy,
  ) {
    super();
  }

  create(data) {
    this.create_api.addUpdateExpense(data);
  }

  delete(){}

  fetch(){}

  list(filter){
    const subject = new Subject<ListResult<MyExpenseReport>>();
    window.setTimeout(() => {
      subject.next({data: [], length: 0});
      subject.complete();
    }, 1000);
    // this.list_api.fetchExpenses(0, 0, 0, 0, 0, '0', '0', '0', 0, 0, 0).subscribe(data => {
    //   subject.next({data: data.result.map(expense => new MyExpenseRequest(expense)), length: data.totalCount});
    //   subject.complete();
    // });
    return subject.asObservable();
  }
  

}
