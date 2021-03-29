import { Injectable } from '@angular/core';
import { createSubscription, FAKER_CONFIG, getCreateResponse, IFaker, myClassFaker, myPropertyFaker } from 'app/modules/career-succession/services/base';
import { CrudService, ListResult } from 'app/_services/base-api.service';
import { Observable } from 'rxjs';


@myClassFaker
export class MyDisbursement implements IFaker {
  getFake() {
    return this;
  }

  @myPropertyFaker(FAKER_CONFIG.words, {})
  channel: string;
  @myPropertyFaker(FAKER_CONFIG.number, {})
  budget_item_id: number;
  @myPropertyFaker(FAKER_CONFIG.words, {})
  budget_item_name: string;
  @myPropertyFaker(FAKER_CONFIG.number, {max: 3})
  disburse_from: number;
  @myPropertyFaker(FAKER_CONFIG.number, {})
  employee_id: number;
  @myPropertyFaker(FAKER_CONFIG.name, {})
  employee_name: string;
  @myPropertyFaker(FAKER_CONFIG.number, {})
  amount: number;
  @myPropertyFaker(FAKER_CONFIG.date, {})
  scheduled_date: Date;
  @myPropertyFaker(FAKER_CONFIG.words, {})
  description: string;
  @myPropertyFaker(FAKER_CONFIG.boolean, {})
  save_as_beneficiary: boolean;
  @myPropertyFaker(FAKER_CONFIG.boolean, {})
  recurring: boolean;
  @myPropertyFaker(FAKER_CONFIG.number, {})
  beneficiary_id: number;
  @myPropertyFaker(FAKER_CONFIG.name, {})
  beneficiary_name: string;

}

@Injectable({
  providedIn: 'root'
})
export class DisbursementService extends CrudService<MyDisbursement, MyDisbursement, MyDisbursement> {
  list(filter: MyDisbursement): Observable<ListResult<MyDisbursement>> {
    return createSubscription({
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(data => new MyDisbursement().getFake()),
      length: 10,
    });
  }
  fetch(id: number) {
    return createSubscription(new MyDisbursement().getFake());
  }
  create(data: MyDisbursement) {
    return getCreateResponse();
  }
  delete(id: number) {
    return getCreateResponse();
  }

  // constructor() { }
}
