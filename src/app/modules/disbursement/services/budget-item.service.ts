import { Injectable } from '@angular/core';
import { createSubscription, FAKER_CONFIG, getCreateResponse, IFaker, myClassFaker, myPropertyFaker } from 'app/modules/career-succession/services/base';
import { CrudService, ListResult } from 'app/_services/base-api.service';
import { Observable } from 'rxjs';


@myClassFaker
export class MyBudgetItemDepartment implements IFaker {
  getFake() {
    // throw new Error('Method not implemented.');
    return this;
  }

  @myPropertyFaker(FAKER_CONFIG.number, {})
  department_id: string;
  @myPropertyFaker(FAKER_CONFIG.words, {})
  department_name: string;
  @myPropertyFaker(FAKER_CONFIG.number, {})
  amount: number;
  @myPropertyFaker(FAKER_CONFIG.number, {})
  spent: number;

}

@myClassFaker
export class MyBudgetItem implements IFaker {
  getFake() {
    // throw new Error('Method not implemented.');
    return this;
  }


  @myPropertyFaker(FAKER_CONFIG.words, {})
  budget_item: string;
  @myPropertyFaker(FAKER_CONFIG.words, {})
  budget_code: string;
  @myPropertyFaker(FAKER_CONFIG.number, {})
  amount: number;
  @myPropertyFaker(FAKER_CONFIG.number, {})
  id: number;
  @myPropertyFaker(FAKER_CONFIG.number, {})
  spent: number;


  @myPropertyFaker(FAKER_CONFIG.object, {class: MyBudgetItemDepartment, array: true})
  departments: MyBudgetItemDepartment[];
}


@Injectable({
  providedIn: 'root'
})
export class BudgetItemService {
  list(budget_id: number, filter: MyBudgetItem): Observable<ListResult<MyBudgetItem>> {
    return createSubscription({
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(data => new MyBudgetItem().getFake()),
      length: 10,
    });
  }
  fetch(id: number) {
    return new MyBudgetItem().getFake()
  }
  create(data: MyBudgetItem) {
    return getCreateResponse();
  }
  delete(id: number) {
    return getCreateResponse();
  }

  constructor() { }
}
