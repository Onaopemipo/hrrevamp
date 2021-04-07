import { Injectable } from '@angular/core';
import { createSubscription, FAKER_CONFIG, getCreateResponse, IFaker, myClassFaker, myPropertyFaker } from 'app/modules/career-succession/services/base';
import { CrudService, ListResult } from 'app/_services/base-api.service';
import { Observable } from 'rxjs';

@myClassFaker
export class MyBudget implements IFaker {
  getFake() {
    // throw new Error('Method not implemented.');
    return this;
  }

  @myPropertyFaker(FAKER_CONFIG.date, {})
  financial_year_start: Date;
  @myPropertyFaker(FAKER_CONFIG.date, {})
  financial_year_end: Date;
  @myPropertyFaker(FAKER_CONFIG.number, {})
  amount: number;
  @myPropertyFaker(FAKER_CONFIG.number, {})
  id: number;
  @myPropertyFaker(FAKER_CONFIG.number, {})
  spent: number;
}

@Injectable({
  providedIn: 'root'
})
export class BudgetService extends CrudService<MyBudget, MyBudget, MyBudget> {
  list(filter: MyBudget): Observable<ListResult<MyBudget>> {
    return createSubscription({
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(data => new MyBudget().getFake()),
      length: 10,
    });
  }
  fetch(id: number) {
    return createSubscription(new MyBudget().getFake());
  }
  create(data: MyBudget) {
    return getCreateResponse();
  }
  delete(id: number) {
    return getCreateResponse();
  }

  constructor() {
    super();
  }
}
