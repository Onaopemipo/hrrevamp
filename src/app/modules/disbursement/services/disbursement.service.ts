import { Injectable } from '@angular/core';
import { IStatus, MyColor } from 'app/components/status/models';
import { createSubscription, FAKER_CONFIG, getCreateResponse, IFaker, myClassFaker, myPropertyFaker } from 'app/modules/career-succession/services/base';
import { CrudService, ListResult } from 'app/_services/base-api.service';
import { Observable } from 'rxjs';


@myClassFaker
export class MyDisbursement implements IFaker, IStatus {
  getStatusLabel(): string {
    return 'active'
  }
  getStatusColor(): MyColor {
    return new MyColor(100, 100, 100);
  }
  getFake() {
    return this;
  }

  @myPropertyFaker(FAKER_CONFIG.words, {})
  channel: string;
  @myPropertyFaker(FAKER_CONFIG.number, {})
  budget_item_id: number;
  @myPropertyFaker(FAKER_CONFIG.number, {})
  bank_name: number;
  @myPropertyFaker(FAKER_CONFIG.words, {})
  budget_item_name: string;
  @myPropertyFaker(FAKER_CONFIG.words, {})
  recipient: string;
  @myPropertyFaker(FAKER_CONFIG.number, {max: 3})
  disburse_for: number;
  @myPropertyFaker(FAKER_CONFIG.number, {max: 3})
  account_number: number;
  @myPropertyFaker(FAKER_CONFIG.number, {})
  @myPropertyFaker(FAKER_CONFIG.words, {})
  account_name: string;
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
  @myPropertyFaker(FAKER_CONFIG.boolean, {})
  frequency: boolean;
  @myPropertyFaker(FAKER_CONFIG.boolean, {})
  startDate: Date;
  @myPropertyFaker(FAKER_CONFIG.boolean, {})
  endDate: Date;
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
