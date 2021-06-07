import { D } from '@angular/cdk/keycodes';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'app/components/base/base.component';
import { FormConfig, FORM_TYPES } from 'app/components/custom-form/custom-form.component';
import { ChoiceName } from 'app/components/multi-select/multi-select.component';
import { ColumnTypes, TableAction, TableActionEvent, TableColumn } from 'app/components/tablecomponent/models';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { ListResult } from 'app/_services/base-api.service';
import { ConfirmBoxService } from 'app/_services/confirm-box.service';
import { Observable } from 'rxjs';
import { AssetApiModelClass, AssetBaseService, AssetCategoryService, AssetSubTypeService, AssetTypeService, MyAssetCategory, MyAssetCategoryFilter, MyAssetSubTypeFilter, MyAssetSubType, AssetMakeService, MyAssetModelFilter, MyAssetModel, AssetModelService, AssetStatusService } from '../../services/asset-category.service';

enum DEFAULT_TABLE_ACTIONS{ edit = 'edit', delete = 'delete' }


@Component({
  template: ''
})
export abstract class AssetBaseComponent<F, D extends AssetApiModelClass> extends BaseComponent<D, F, D> implements AfterViewInit{
  data: D[] = [];
  protected abstract api: AssetBaseService<D, F>;
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
    console.log(this.data)
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
  edit(data: MyAssetCategory) {
    this.showModal = true;
  }
  tableActionClick(event: TableActionEvent) {
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
  selector: 'ngx-asset-category',
  templateUrl: './asset-category.component.html',
  styleUrls: ['./asset-category.component.scss']
})
export class AssetCategoryComponent extends AssetBaseComponent<MyAssetCategoryFilter, MyAssetCategory>{
  constructor(
    protected api: AssetCategoryService,
    protected confirmBoxService: ConfirmBoxService,
    protected alertService: AlertserviceService,
  ) {
    super(confirmBoxService);
  }
  objectName = 'Asset Category';
  getTableColumns(): TableColumn[] {
    return [
      {name: 'name', title: 'Name'},
      {name: 'dateCreated', title: 'Date Modified', type: ColumnTypes.Date},
      {name: 'name', title: 'Status', type: ColumnTypes.Status},
    ];
  }
  formConfig = {
    fields: [
      {name: 'name', label: 'Name', type: FORM_TYPES.text},
      {name: 'description', label: 'Description', type: FORM_TYPES.wysiwyg},
    ]
  };
  getFormConfig(): FormConfig {
    return {
      fields: [
        {name: 'name', label: 'Name', type: FORM_TYPES.text},
        {name: 'description', label: 'Description', type: FORM_TYPES.wysiwyg},
      ]
    };
  }
  filter: MyAssetCategoryFilter = {};
  getNewEditingData(): MyAssetCategory {
    return new MyAssetCategory();
  }
}


enum AssetTypeActions {
  subtypes = 'subtypes'
}
@Component({
  selector: 'ngx-asset-type',
  templateUrl: './asset-category.component.html',
  styleUrls: ['./asset-category.component.scss']
})
export class MyAssetTypeComponent extends AssetBaseComponent<MyAssetCategoryFilter, MyAssetCategory>{
  constructor(
    protected api: AssetTypeService,
    protected confirmBoxService: ConfirmBoxService,
    protected alertService: AlertserviceService,
    protected router: Router,
  ) {
    super(confirmBoxService);
  }
  objectName = 'Asset Type';
  getTableColumns(): TableColumn[] {
    return [
      {name: 'name', title: 'Name'},
      {name: 'dateCreated', title: 'Date Modified', type: ColumnTypes.Date},
      {name: 'name', title: 'Status', type: ColumnTypes.Status},
    ];
  }
  formConfig = {
    fields: [
      {name: 'name', label: 'Name', type: FORM_TYPES.text},
      {name: 'description', label: 'Description', type: FORM_TYPES.wysiwyg},
    ]
  };
  getFormConfig(): FormConfig {
    return {
      fields: [
        {name: 'name', label: 'Name', type: FORM_TYPES.text},
        {name: 'description', label: 'Description', type: FORM_TYPES.wysiwyg},
      ]
    };
  }
  filter: MyAssetCategoryFilter = {};
  getNewEditingData(): MyAssetCategory {
    return new MyAssetCategory();
  }
  getTableActions(){
    const actions = super.getTableActions();
    actions.push({name: AssetTypeActions.subtypes, label: 'Subtypes'});
    return actions;
  }
  tableActionClick(event: TableActionEvent<MyAssetCategory>) {
    if (super.tableActionClick(event)) return true;
    this.router.navigateByUrl('/asset/types/' + event.data.id + '/subtypes');
    return true;
  }
}


@Component({
  selector: 'ngx-asset-sub-type',
  templateUrl: './asset-category.component.html',
  styleUrls: ['./asset-category.component.scss']
})
export class MyAssetSubTypeComponent extends AssetBaseComponent<MyAssetSubTypeFilter, MyAssetSubType>{
  constructor(
    protected api: AssetSubTypeService,
    protected confirmBoxService: ConfirmBoxService,
    protected alertService: AlertserviceService,
    private activatedRoute: ActivatedRoute,
  ) {
    super(confirmBoxService);
  }
  objectName = 'Asset Subtype';
  getTableColumns(): TableColumn[] {
    return [
      {name: 'name', title: 'Name'},
      {name: 'dateCreated', title: 'Date Modified', type: ColumnTypes.Date},
      {name: 'name', title: 'Status', type: ColumnTypes.Status},
    ];
  }
  formConfig = {
    fields: [
      {name: 'name', label: 'Name', type: FORM_TYPES.text},
      {name: 'description', label: 'Description', type: FORM_TYPES.wysiwyg},
    ]
  };
  getFormConfig(): FormConfig {
    return {
      fields: [
        {name: 'name', label: 'Name', type: FORM_TYPES.text},
        {name: 'description', label: 'Description', type: FORM_TYPES.wysiwyg},
      ]
    };
  }
  filter: MyAssetSubTypeFilter = {};
  getNewEditingData(): MyAssetSubType {
    const obj = new MyAssetSubType();
    obj.assetTypeId = this.type_id;
    return obj;
  }

  type_id = 1;
  
  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      this.type_id = Number(param['id']);
      this.filter = {};
      this.filter.type_id = this.type_id;
      super.ngOnInit();
    });
  };
}

@Component({
  selector: 'ngx-asset-make',
  templateUrl: './asset-category.component.html',
  styleUrls: ['./asset-category.component.scss']
})
export class MyAssetMakeComponent extends AssetBaseComponent<MyAssetCategoryFilter, MyAssetCategory>{
  constructor(
    protected api: AssetMakeService,
    protected confirmBoxService: ConfirmBoxService,
    protected alertService: AlertserviceService,
    protected router: Router,
  ) {
    super(confirmBoxService);
  }
  objectName = 'Asset Make';
  getTableColumns(): TableColumn[] {
    return [
      {name: 'name', title: 'Name'},
      {name: 'dateCreated', title: 'Date Modified', type: ColumnTypes.Date},
      {name: 'name', title: 'Status', type: ColumnTypes.Status},
    ];
  }
  formConfig = {
    fields: [
      {name: 'name', label: 'Name', type: FORM_TYPES.text},
      {name: 'description', label: 'Description', type: FORM_TYPES.wysiwyg},
    ]
  };
  getFormConfig(): FormConfig {
    return {
      fields: [
        {name: 'name', label: 'Name', type: FORM_TYPES.text},
        {name: 'description', label: 'Description', type: FORM_TYPES.wysiwyg},
      ]
    };
  }
  filter: MyAssetCategoryFilter = {};
  getNewEditingData(): MyAssetCategory {
    return new MyAssetCategory();
  }
  getTableActions(){
    const actions = super.getTableActions();
    actions.push({name: AssetTypeActions.subtypes, label: 'Models'});
    return actions;
  }
  tableActionClick(event: TableActionEvent<MyAssetCategory>) {
    if (super.tableActionClick(event)) return true;
    this.router.navigateByUrl('/asset/makes/' + event.data.id + '/models');
    return true;
  }
}


@Component({
  selector: 'ngx-asset-model',
  templateUrl: './asset-category.component.html',
  styleUrls: ['./asset-category.component.scss']
})
export class MyAssetModelComponent extends AssetBaseComponent<MyAssetModelFilter, MyAssetModel> {
  constructor(
    protected api: AssetModelService,
    protected confirmBoxService: ConfirmBoxService,
    protected alertService: AlertserviceService,
    private activatedRoute: ActivatedRoute,
  ) {
    super(confirmBoxService);
  }
  objectName = 'Asset Model';
  getTableColumns(): TableColumn[] {
    return [
      {name: 'name', title: 'Name'},
      {name: 'dateCreated', title: 'Date Modified', type: ColumnTypes.Date},
      {name: 'name', title: 'Status', type: ColumnTypes.Status},
    ];
  }
  formConfig = {
    fields: [
      {name: 'name', label: 'Name', type: FORM_TYPES.text},
      {name: 'description', label: 'Description', type: FORM_TYPES.wysiwyg},
    ]
  };
  getFormConfig(): FormConfig {
    return {
      fields: [
        {name: 'name', label: 'Name', type: FORM_TYPES.text},
        {name: 'description', label: 'Description', type: FORM_TYPES.wysiwyg},
      ]
    };
  }
  filter: MyAssetModelFilter = {};
  getNewEditingData(): MyAssetModel {
    const obj = new MyAssetModel();
    obj.assetMakeId = this.make_id;
    return obj;
  }

  make_id = 1;

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      this.make_id = Number(param['id']);
      this.filter = {};
      this.filter.assetMakeId = this.make_id;
      super.ngOnInit();
    });
  };
}


@Component({
  selector: 'ngx-my-asset-status',
  templateUrl: './asset-category.component.html',
  styleUrls: ['./asset-category.component.scss']
})
export class MyAssetStatusComponent extends AssetBaseComponent<MyAssetCategoryFilter, MyAssetCategory>{
  constructor(
    protected api: AssetStatusService,
    protected confirmBoxService: ConfirmBoxService,
    protected alertService: AlertserviceService,
  ) {
    super(confirmBoxService);
  }
  objectName = 'Asset Status';
  getTableColumns(): TableColumn[] {
    return [
      {name: 'name', title: 'Name'},
      {name: 'dateCreated', title: 'Date Modified', type: ColumnTypes.Date},
      {name: 'name', title: 'Status', type: ColumnTypes.Status},
    ];
  }
  formConfig = {
    fields: [
      {name: 'name', label: 'Name', type: FORM_TYPES.text},
      {name: 'description', label: 'Description', type: FORM_TYPES.wysiwyg},
    ]
  };
  getFormConfig(): FormConfig {
    return {
      fields: [
        {name: 'name', label: 'Name', type: FORM_TYPES.text},
        {name: 'description', label: 'Description', type: FORM_TYPES.wysiwyg},
      ]
    };
  }
  filter: MyAssetCategoryFilter = {};
  getNewEditingData(): MyAssetCategory {
    return new MyAssetCategory();
  }
}

