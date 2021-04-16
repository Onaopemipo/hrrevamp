import { Injectable } from '@angular/core';
import { IStatus, MyColor } from 'app/components/status/models';
import { createSubscription, FAKER_CONFIG, getCreateResponse, IFaker, MessageOut, myClassFaker, myPropertyFaker } from 'app/modules/career-succession/services/base';
import { CrudService, ListResult } from 'app/_services/base-api.service';
import { AddUpdatePaymentInstitutionServiceProxy, AssetCategoryDTO, AssetDTO, AssetManagementServiceProxy, AssetModelDTO, AssetSubTypeDTO, GetAllPaymentInstitutionsServiceProxy, Institution, ManagePayInstitutionDTO, PayInstitutionDTO } from 'app/_services/service-proxies';
import { date } from 'faker';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BooleanLiteral } from 'typescript';
import { extend } from 'validate.js';


export abstract class PayrollApiModelClass<D=any, E=any>{
  // @myPropertyFaker(FAKER_CONFIG.number, {})
  id: number;
  // @myPropertyFaker(FAKER_CONFIG.name, {})
  // name: string;
  // @myPropertyFaker(FAKER_CONFIG.words, {})
  // description: string;
  // @myPropertyFaker(FAKER_CONFIG.boolean, {})
  // isActive: boolean;
  // @myPropertyFaker(FAKER_CONFIG.boolean, {})
  // isDeleted: boolean;
  // @myPropertyFaker(FAKER_CONFIG.date, {})
  // dateCreated: Date;
  // abstract generateEmptyFilter(obj): F;
  abstract fromApi(data: D): PayrollApiModelClass;
  abstract toManage(): E;

  getStatusLabel(): string {
    return 'Active';
  }
  getStatusColor(): MyColor {
    return new MyColor(200, 200, 200);
  }
  getFake() {
    // throw new Error('Method not implemented.');
    return this;
  }
};

class DefaultResponse<T>{
  result: T[];
  totalCount: number;
}
export abstract class CommonBaseService<D, F> extends CrudService<F, D, D>  {
  getData<T>(data: DefaultResponse<T>, x: (a: T) => D): ListResult<D>{
    return {
      data: data.result.map(obj => x(obj)),
      length: data.totalCount,
    };
  }
  abstract list(filter: F): Observable<ListResult<D>>;
  fetch(id: number) {
    throw new Error('Method not implemented.');
  }
  abstract create(data: D): Observable<any>;
  abstract delete(id: number): Observable<any>;
}
export class BaseFilter{
  pageSize?: number;
  pageNumber?: number;
}

export class MyPayrollInstitutionFilter extends BaseFilter {
  categoryId?: number;
}

export class MyPayrollInstutionModel extends PayrollApiModelClass<PayInstitutionDTO, ManagePayInstitutionDTO>{
  name: string;
  category_id: number;
  account_name: string;
  account_number: string;
  bank_id: number;
  fromApi(data: PayInstitutionDTO) {
    this.name = data.name;
    this.category_id = data.categoryId;
    this.account_name = data.accountName;
    this.account_number = data.accountName;
    this.bank_id = data.bankId;
    return this;
  }
  toManage(): ManagePayInstitutionDTO {
    return new ManagePayInstitutionDTO({
      id: this.id,
      categoryId: this.category_id,
      name: this.name,
      accountNumber: this.account_number,
      accountName: this.account_name,
      bankId: this.bank_id
    })
  }
}


@Injectable({
  providedIn: 'root'
})
export class MyPayrollInstitutionService extends CommonBaseService<MyPayrollInstutionModel, MyPayrollInstitutionFilter>{
  constructor(
    private create_api: AddUpdatePaymentInstitutionServiceProxy,
    private list_api_call: GetAllPaymentInstitutionsServiceProxy,
  ){
    super();
  }
  list(filter: MyPayrollInstitutionFilter): Observable<ListResult<MyPayrollInstutionModel>>{
    const res = this.list_api_call.getAllPaymentInstitutions(filter.pageSize, filter.pageNumber, filter.categoryId);
    return res.pipe(map(x => this.getData(x, y => new MyPayrollInstutionModel().fromApi(y))));
  }
  create(data: MyPayrollInstutionModel): Observable<any> {
    return this.create_api.addUpdatePaymentInstitution(data.toManage());
  }
  delete(id: number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}