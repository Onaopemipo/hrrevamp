import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BaseComponent } from 'app/components/base/base.component';
import { FormConfig, FORM_TYPES } from 'app/components/custom-form/custom-form.component';
import { ColumnTypes, TableAction, TableActionEvent, TableColumn } from 'app/components/tablecomponent/models';
import { MyAssetCategory } from 'app/modules/asset-management/services/asset-category.service';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { ListResult } from 'app/_services/base-api.service';
import { ConfirmBoxService } from 'app/_services/confirm-box.service';
import { Observable } from 'rxjs';
import { CommonBaseService, MyPayrollInstitutionFilter, MyPayrollInstitutionService, MyPayrollInstutionModel, PayrollApiModelClass } from '../services/common.service';

enum DEFAULT_TABLE_ACTIONS{ edit = 'edit', delete = 'delete' }

@Component({
  template: ''
})
export abstract class PayrollBaseComponent<F, D extends PayrollApiModelClass> extends BaseComponent<D, F, D> implements AfterViewInit{
  data: D[] = [];
  protected abstract api: CommonBaseService<D, F>;
  protected abstract confirmBoxService: ConfirmBoxService;
  protected abstract alertService: AlertserviceService;
  abstract objectName: string;
  getData(): Observable<ListResult<D>> {
    return this.api.list(this.filter);
  }
  saveData(e: D): Observable<any> {
    const obj = this.getNewEditingData();
    Object.assign(obj, e);
    return this.api.create(obj);
  }
  successMessage: string;
  deleteData(data: D): Observable<any> {
    return this.api.delete(data.id);
  }


  get emptyConfig() {
    return {
      pageHeader: `Create your first ${this.objectName}`,
      pageDescription: `Click on the button to create a ${this.objectName}`,
      buttonValue: `Create ${this.objectName}`,
      actionName: '1',
    };
  };

  abstract getTableColumns(): TableColumn[];
  // tableColumns = [
  //   {name: 'name', title: 'Name'},
  //   {name: 'dateCreated', title: 'Date Modified', type: ColumnTypes.Date},
  //   {name: 'name', title: 'Status', type: ColumnTypes.Status},
  // ];
  tableActions: TableAction[] = [];
  // get tableActions(): TableAction[] {
  //   console.log(888);
  //   return [
  //     {name: DEFAULT_TABLE_ACTIONS.edit, label: 'Update'},
  //     {name: DEFAULT_TABLE_ACTIONS.delete, label: 'Delete'},
  //   ];
  // }
  getTableActions(): TableAction[] {
    return [
      {name: DEFAULT_TABLE_ACTIONS.edit, label: 'Update'},
      {name: DEFAULT_TABLE_ACTIONS.delete, label: 'Delete'},
    ];
  }
  setTableActions() {
    this.tableActions = this.getTableActions();
  }
  getPageTitle() {
    return this.objectName;
  }
  getRequiredButton() {
    return [{name: 'newTraining', label: `New ${this.objectName}`, icon: 'plus'}];
  }
  // requiredButton = [];
  // formConfig: FormConfig = {
  //   fields: [
  //     {name: 'name', label: 'Name', type: FORM_TYPES.text},
  //     {name: 'description', label: 'Description', type: FORM_TYPES.wysiwyg},
  //   ]
  // };

  abstract getFormConfig(): FormConfig;
  getFormTitle() {
    return `Add new ${this.objectName}`;
  }
  edit(data: D) {
    this.showModal = true;
  }
  tableActionClick(event: TableActionEvent<D>) {
    this.editingData = this.getNewEditingData();
    this.editingData = Object.assign(this.editingData, event.data);
    if (event.name === DEFAULT_TABLE_ACTIONS.edit) {
      this.edit(event.data);
      return true;
    }
    if (event.name === DEFAULT_TABLE_ACTIONS.delete) {
      this.deleteRow('Are you sure to delete this asset category?');
      return true;
    }
    return false;
  }

  ngAfterViewInit() {
    this.setTableActions();
  }
}

@Component({
  selector: 'ngx-institutionalmanagement',
  templateUrl: './institutionalmanagement.component.html',
  styleUrls: ['./institutionalmanagement.component.scss']
})
export class InstitutionalmanagementComponent extends PayrollBaseComponent<
    MyPayrollInstitutionFilter, MyPayrollInstutionModel> {
  getFormConfig(): FormConfig {
    throw new Error('Method not implemented.');
  }
  constructor(
    protected api: MyPayrollInstitutionService,
    protected confirmBoxService: ConfirmBoxService,
    protected alertService: AlertserviceService,
  ) {
    super(confirmBoxService);
  }
  objectName = 'Payment Institution';
  getTableColumns(): TableColumn[] {
    return [
      { name: 'name', title: 'NAME' },
      { name: 'category_id', title: 'INDUSTRY' },
      { name: 'account_name', title: 'ACCOUNT NAME' },
      { name: 'account_number', title: 'ACCOUNT NUMBER' },
      { name: 'bank_id', title: 'BANK' },
      // {name: 'name', title: 'Name'},
      // {name: 'dateCreated', title: 'Date Modified', type: ColumnTypes.Date},
      // {name: 'name', title: 'Status', type: ColumnTypes.Status},
    ];
  }
  formConfig = {
    fields: [
      {name: 'name', label: 'Name', type: FORM_TYPES.text},
      {name: 'category_id', label: 'Category', type: FORM_TYPES.text},
      {name: 'account_name', label: 'Account Name', type: FORM_TYPES.text},
      {name: 'account_number', label: 'Account Number', type: FORM_TYPES.text},
      {name: 'bank_id', label: 'Bank', type: FORM_TYPES.text},
    ]
  };
  filter: MyPayrollInstitutionFilter = {};
  getNewEditingData(): MyPayrollInstutionModel {
    return new MyPayrollInstutionModel();
  }

}
