import { Injectable } from '@angular/core';
import { CrudService, ListResult } from 'app/_services/base-api.service';
import { Subject } from 'rxjs';

export class MyExpenseReport {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExpenseReportService  extends CrudService<MyExpenseReport, {}, MyExpenseReport>{
  constructor() {
    super();
  }

  create(data){

  }

  delete(){}

  fetch(){}

  list(filter){
    const subject = new Subject<ListResult<MyExpenseReport>>();
    window.setTimeout(() => {
      subject.next({data: [], length: 0});
      subject.complete();
    }, 1000);
    // this.api_list.fetchExpenses(0, 0, 0, 0, 0, '0', '0', '0', 0, 0, 0).subscribe(data => {
    //   subject.next({data: data.result.map(expense => new MyExpenseRequest(expense)), length: data.totalCount});
    //   subject.complete();
    // });
    return subject.asObservable();
  }
  

}
