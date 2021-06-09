import { ToggleExpenseGroupServiceProxy, ToggleExpenseProjectServiceProxy, ToggleProjectActivityServiceProxy, ToggleExpenseTypeServiceProxy, ToggleExpenseSubTypeServiceProxy, AddUpdateExpenseTypeServiceProxy } from './../../../_services/service-proxies';
import { Injectable } from '@angular/core';
import { IStatus, MyColor } from 'app/components/status/models';
import { AssetBaseService } from 'app/modules/asset-management/services/asset-category.service';
import { createSubscription, MessageOut } from 'app/modules/career-succession/services/base';
import { ListResult } from 'app/_services/base-api.service';
import { AddExpenseSubTypeServiceProxy, AddUpdateExpenseGroupServiceProxy, AddUpdateExpenseProjectServiceProxy, AddUpdateLoanTypeServiceProxy, AddUpdateProjectActivityServiceProxy, AssetDTO, AssetManagementServiceProxy, ExpenseGroup, ExpenseGroupDto, ExpenseProject, ExpenseProjectActivity, ExpenseProjectActivityDTO, ExpenseProjectDto, ExpenseSubType, ExpenseType, ExpenseTypeDto, GetExpenseGroupsServiceProxy, GetExpenseProjectServiceProxy, GetExpenseSubTypesServiceProxy, GetExpenseTypesServiceProxy, GetProjectActivityServiceProxy, IState } from 'app/_services/service-proxies';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export class MyExpenseGroup extends ExpenseGroup implements IStatus{
  constructor(data = new ExpenseGroup()) {
    super(data);
  }
  getStatusLabel(): string {
    return 'Active';
  }
  getStatusColor(): MyColor {
    return new MyColor(200, 200, 200);
  }

  get selectLabel() {
    return this.name;
  }

  get selectValue() {
    return this.id;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ExpenseGroupService extends AssetBaseService<MyExpenseGroup, any> {
  list_api(filter: any) {
    return this.list_api_service.getExpenseGroups( '', '', '', 1, 10);
  }
  toData(obj: ExpenseGroup): MyExpenseGroup {
    return new MyExpenseGroup(obj);
  }
  list(filter: any): Observable<ListResult<MyExpenseGroup>> {
    console.log('aaa');
    return this.list_api(filter).pipe(map(res => {
      console.log(res);
      return {
        data: res.result.map(obj => this.toData(obj)),
        length: res.totalCount,
      };
    }));
  }
  fetch(id: number) {
    throw new Error('Method not implemented.');
  }
  create(data: MyExpenseGroup) {
    return this.create_api.addUpdateExpenseGroup(new ExpenseGroupDto({...data}));
  }
  delete(id: number) {
   return this.expense.toggleExpenseGroup(id.toString())
    // return createSubscription(new MessageOut('Deleted successfully', true));
  }

  constructor(
    private create_api: AddUpdateExpenseGroupServiceProxy,
    private list_api_service: GetExpenseGroupsServiceProxy,
    private expense: ToggleExpenseGroupServiceProxy
  ) {
    super();
  }
}


export class MyExpenseProjectActivity extends ExpenseProjectActivity implements IStatus{
  actionTitle: string = '';
  startDateString = '';
  endDateString = '';
  status = '';
  constructor(data = new ExpenseProjectActivity()) {
    super(data);
  }
  getStatusLabel(): string {
    return 'Active';
  }
  getStatusColor(): MyColor {
    return new MyColor(200, 200, 200);
  }

  get selectLabel() {
    return this.name;
  }

  get selectValue() {
    return this.id;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ExpenseProjectActivityService extends AssetBaseService<MyExpenseProjectActivity, any> {
  list_api(filter: any) {
    return this.list_api_service.getProjectActivity('', '', '', 1, 10);
  }
  toData(obj: ExpenseProjectActivity): MyExpenseProjectActivity {
    return new MyExpenseProjectActivity(obj);
  }
  list(filter: any): Observable<ListResult<MyExpenseProjectActivity>> {
    console.log('aaa');
    return this.list_api(filter).pipe(map(res => {
      console.log(res);
      return {
        data: res.result.map(obj => this.toData(obj)),
        length: res.totalCount,
      };
    }));
  }
  fetch(id: number) {
    throw new Error('Method not implemented.');
  }
  create(data: MyExpenseProjectActivity) {
    return this.create_api.addUpdateProjectActivity(new ExpenseProjectActivityDTO({
      ...data,
    }));
  }
  delete(id: number) {
    return this.expenseProjectActivity.toggleLoanType(id)
    // return createSubscription(new MessageOut('Deleted successfully', true));
  }

  constructor(
    private create_api: AddUpdateProjectActivityServiceProxy,
    private list_api_service: GetProjectActivityServiceProxy,
    private expenseProjectActivity: ToggleProjectActivityServiceProxy,
  ) {
    super();
  }
}

export class MyExpenseProject extends ExpenseProject implements IStatus{
  actionTitle: string = '';
  startDateString = '';
  endDateString = '';
  status = '';
  constructor(data = new ExpenseProject()) {
    super(data);
  }
  getStatusLabel(): string {
    return 'Active';
  }
  getStatusColor(): MyColor {
    return new MyColor(200, 200, 200);
  }

  get selectLabel() {
    return this.name;
  }

  get selectValue() {
    return this.id;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ExpenseProjectService extends AssetBaseService<MyExpenseProject, any> {
  list_api(filter: any) {
    return this.list_api_service.getExpenseProject(0, '', '', false, '', '', 1, 10);
  }
  toData(obj: ExpenseProject): MyExpenseProject {
    return new MyExpenseProject(obj);
  }
  list(filter: any): Observable<ListResult<MyExpenseProject>> {
    console.log('aaa');
    return this.list_api(filter).pipe(map(res => {
      console.log(res);
      return {
        data: res.result.map(obj => this.toData(obj)),
        length: res.totalCount,
      };
    }));
  }
  fetch(id: number) {
    throw new Error('Method not implemented.');
  }
  create(data: MyExpenseProject) {
    return this.create_api.addUpdateExpenseProject(new ExpenseProjectDto({
      ...data,
    }));
  }
  delete(id: number) {
   return this.expenseProject.toggleExpenseProject(id.toString());
  }

  constructor(
    private create_api: AddUpdateExpenseProjectServiceProxy,
    private list_api_service: GetExpenseProjectServiceProxy,
    private expenseProject: ToggleExpenseProjectServiceProxy
  ) {
    super();
  }
}


export class MyExpenseType extends ExpenseType implements IStatus{
  actionTitle: string = '';
  startDateString = '';
  endDateString = '';
  status = '';
  constructor(data = new ExpenseType()) {
    super(data);
  }
  getStatusLabel(): string {
    return 'Active';
  }
  getStatusColor(): MyColor {
    return new MyColor(200, 200, 200);
  }

  get selectLabel() {
    return this.name;
  }

  get selectValue() {
    return this.id;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ExpenseTypeService extends AssetBaseService<MyExpenseType, any> {
  list_api(filter: any) {
    return this.list_api_service.getExpenseTypes( '', '', '', 1, 10);
  }
  toData(obj: ExpenseType): MyExpenseType {
    return new MyExpenseType(obj);
  }
  list(filter: any): Observable<ListResult<MyExpenseType>> {
    console.log('aaa');
    return this.list_api(filter).pipe(map(res => {
      console.log(res);
      return {
        data: res.result.map(obj => this.toData(obj)),
        length: res.totalCount,
      };
    }));
  }
  fetch(id: number) {
    throw new Error('Method not implemented.');
  }
  create(data: MyExpenseType) {
    return this.newcreate_api.addUpdateLoanType(new ExpenseTypeDto({
      ...data,
    }));
  }
  delete(id: number) {
   return this.expenseType.toggleExpenseType(id.toString());
    // return createSubscription(new MessageOut('Deleted successfully', true));
  }

  constructor(
    private create_api: AddUpdateLoanTypeServiceProxy,
    private newcreate_api: AddUpdateExpenseTypeServiceProxy,
    private list_api_service: GetExpenseTypesServiceProxy,
    private expenseType: ToggleExpenseTypeServiceProxy
  ) {
    super();
  }
}

export class MyExpenseSubType extends ExpenseSubType implements IStatus{
  actionTitle: string = '';
  startDateString = '';
  endDateString = '';
  status = '';
  constructor(data = new ExpenseSubType()) {
    super(data);
  }
  getStatusLabel(): string {
    return 'Active';
  }
  getStatusColor(): MyColor {
    return new MyColor(200, 200, 200);
  }

  get selectLabel() {
    return this.name;
  }

  get selectValue() {
    return this.id;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ExpenseSubTypeService extends AssetBaseService<MyExpenseSubType, any> {
  list_api(filter: any) {
    return this.list_api_service.getExpenseSubTypes( '', '', '', 1, 10);
  }
  toData(obj: ExpenseSubType): MyExpenseSubType {
    return new MyExpenseSubType(obj);
  }
  list(filter: any): Observable<ListResult<MyExpenseSubType>> {
    return this.list_api(filter).pipe(map(res => {
      return {
        data: res.result.map(obj => this.toData(obj)),
        length: res.totalCount,
      };
    }));
  }
  fetch(id: number) {
    throw new Error('Method not implemented.');
  }
  create(data: MyExpenseSubType) {
    return this.create_api.addExpenseSubType(new ExpenseSubType({
      ...{
        expenseTypeId: 0,
        ledgerNo: "string",
        name: "string",
        description: "string",
        referenceId: "string",
        code: "string",
        isDefault: true,
        approvalProcessId: 0,
        budgetedAmount: 0,
        currentAmount: 0,
        strBudgetedAmount: "string",
        strCurrentAmount: "string",
      },
      ...data,
    }));
  }
  delete(id: number) {
    // return this.expenseSubType.toggleExpenseSubType(id.toString());
    return createSubscription(new MessageOut('Deleted successfully', true));
  }

  constructor(
    private create_api: AddExpenseSubTypeServiceProxy,
    private list_api_service: GetExpenseSubTypesServiceProxy,
    private expenseSubType: ToggleExpenseSubTypeServiceProxy,
  ) {
    super();
  }
}
