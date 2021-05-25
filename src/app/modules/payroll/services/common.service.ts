import { Injectable } from '@angular/core';
import { IStatus, MyColor } from 'app/components/status/models';
import { createSubscription, FAKER_CONFIG, getCreateResponse, IFaker, MessageOut, myClassFaker, myPropertyFaker } from 'app/modules/career-succession/services/base';
import { CrudService, ListResult } from 'app/_services/base-api.service';
import { AddUpdatePayElementServiceProxy, AddUpdatePaymentInstitutionServiceProxy, AddUpdatePayScaleServiceProxy, AssetCategoryDTO, AssetDTO, AssetManagementServiceProxy, AssetModelDTO, AssetSubTypeDTO, GetAllPayElementsServiceProxy, GetAllPaymentInstitutionsServiceProxy, GetAllPayrollTypesServiceProxy, Institution, ManagePayElementDTO, ManagePayInstitutionDTO, ManagePayrollTypeDTO, PayElementDTO, PayInstitutionDTO, PayrollTypeDTO } from 'app/_services/service-proxies';
// import { AddUpdatePaymentInstitutionServiceProxy, AssetCategoryDTO, AssetDTO, AssetManagementServiceProxy, AssetModelDTO, AssetSubTypeDTO, GetAllPaymentInstitutionsServiceProxy, Institution, ManagePayInstitutionDTO, PayInstitutionDTO } from 'app/_services/service-proxies';
import { date } from 'faker';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BooleanLiteral } from 'typescript';
import { extend } from 'validate.js';


export abstract class PayrollApiModelClass<D=any, E=any>{
  // @myPropertyFaker(FAKER_CONFIG.number, {})
  id: number;
  name: string;
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
  get selectValue() {
    return this.id;
  }
  get selectLabel() {
    return this.name;
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
  bank_name: string;
  fromApi(data: PayInstitutionDTO) {
    this.name = data.name;
    this.category_id = data.categoryId;
    this.account_name = data.accountName;
    this.account_number = data.accountName;
    this.bank_id = data.bankId;
    this.bank_name = data.bankName
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
    });
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

export class MyPayrollElementFilter extends BaseFilter {
  categoryId?: number;
}

export class MyPayrollElementModel extends PayrollApiModelClass<PayElementDTO, ManagePayElementDTO>{
  name: string;
  type: number;
  element_name: string;
  element_category_id: number;
  element_category: string;
  element_type_id: number;
  element_type: string;
  amount: number;
  institution_id: number;
  institution: string;
  payroll_item_id: number;
  pay_type_id: number;
  is_reocurring: boolean;
  is_tax_deduct: boolean;
  is_variable: boolean;
  start_date: Date;
  end_date: Date;
  fromApi(data: PayElementDTO) {
    this.name = data.name;
    // this.type = data.payTypeId;
    this.element_category_id = data.elementCategoryId;
    this.element_type_id = data.elementTypeId;
    this.amount = data.amount;
    this.institution_id = data.paymentInstitutionId;
    this.element_category = data.elementCategory;
    this.element_type = data.elementType;
    this.institution = data.paymentInstitution;
    // this.pay_type_id = data.payTypeId;
    // this.payroll_item_id = data.payrollItemId;
    this.is_reocurring = data.is_reoccurring;
    this.is_tax_deduct = data.isTaxDeduct;
    this.is_variable = data.is_variable;

    this.start_date = data.start_date;
    this.end_date = data.end_date;
    return this;
  }
  toManage(): ManagePayElementDTO {
    return new ManagePayElementDTO({
      id: this.id,
      payrollItemId: 1,
      payTypeId: 1,
      paymentInstitutionId: this.institution_id,
      name: this.name,
      elementTypeId: this.element_type_id,
      elementCategoryId: this.element_category_id,
      payElementId: 1,
      is_reoccurring: this.is_reocurring,
      isTaxDeduct: this.is_tax_deduct,
      amount: this.amount,
      is_variable: this.is_variable,
      variable: 1,
      ratio: 1,
      taxPercentage: 1,
      hourlyPay: 1,
      noOfWorkHours: 1,
      start_date:new Date(),
      end_date: new Date(),
    });
  }
}

export interface PayElementFilter extends BaseFilter{
  payTypeId?: number;
  institutionId?: number;
  elementTypeId?: number;
  elementCategoryId?: number;
}

export class MyPayrollType extends PayrollApiModelClass<PayrollTypeDTO, ManagePayrollTypeDTO>{
  name: string;
  frequencyRuleId: number;
  frequencyRuleName: string;
  firstPeriodEndDate: Date;
  noOfYears: number;
  noOfEmployees: number;
  effectiveDate: Date;
  negativePaymentAllowed: boolean;
  code: string;
  fromApi(data: PayrollTypeDTO) {
    this.name = data.name;
    this.frequencyRuleId = data.frequencyRuleId;
    this.firstPeriodEndDate = data.firstPeriodEndDate;
    this.noOfYears = data.noOfYears;
    this.noOfYears = data.noOfYears;
    this.negativePaymentAllowed = data.negativePaymentAllowed;
    this.code = data.code;
    this.frequencyRuleName = data.frequencyRule;
    return this;
  }
  toManage(): ManagePayrollTypeDTO {
    return new ManagePayrollTypeDTO({
      id: this.id,
      name: this.name,
      frequencyRuleId: this.frequencyRuleId,
      firstPeriodEndDate: this.firstPeriodEndDate,
     // noOfYears: this.noOfYears,
      effectiveDate: this.effectiveDate,
      payElements: "",
      employeeContracts: ""
     // negativePaymentAllowed: this.negativePaymentAllowed,
      //code: this.code,
    });
  }
}

@Injectable({
  providedIn: 'root'
})
export class MyPayElementService extends CommonBaseService<MyPayrollElementModel, PayElementFilter>{
  constructor(
    private create_api: AddUpdatePayElementServiceProxy,
    private list_api_call: GetAllPayElementsServiceProxy,
  ){
    super();
  }
  list(filter: PayElementFilter): Observable<ListResult<MyPayrollElementModel>>{
    const res = this.list_api_call.getAllPayElements(filter.pageSize, filter.pageNumber, filter.payTypeId, filter.institutionId, filter.elementTypeId, filter.elementCategoryId);
    return res.pipe(map(x => this.getData(x, y => new MyPayrollElementModel().fromApi(y))));
  }
  create(data: MyPayrollElementModel): Observable<any> {
    return this.create_api.addUpdatePayElement(data.toManage());
  }
  delete(id: number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}

export class PayrollTypeFilter extends BaseFilter{
  frequencyRuleId?: number;
}


@Injectable({
  providedIn: 'root'
})
export class MyPayrollTypeService extends CommonBaseService<MyPayrollType, PayrollTypeFilter> {
  constructor(
    private create_api: AddUpdatePayScaleServiceProxy,
    private list_api_call: GetAllPayrollTypesServiceProxy,
  ) {
    super();
  }
  list(filter: PayrollTypeFilter): Observable<ListResult<MyPayrollType>>{
    const res = this.list_api_call.getAllPayrollTypes(10, 1, filter.frequencyRuleId);
    return res.pipe(map(x => this.getData(x, y => new MyPayrollType().fromApi(y))));
  }
  create(data: MyPayrollType): Observable<any> {
    return this.create_api.addUpdatePayScale(data.toManage());
  }
  delete(id: number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
