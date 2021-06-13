import { NbTabComponent } from '@nebular/theme';
import { TableAction, TableActionEvent, TableColumn } from './../../../components/tablecomponent/models';
import { TopAction } from './../../../components/componentsheader/models';
import { Component, OnInit } from '@angular/core';
import { TAB } from '@angular/cdk/keycodes';
import { BaseComponent } from 'app/components/base/base.component';
import { ConfirmBoxService } from 'app/_services/confirm-box.service';
import { MyVendor, VendorService } from '../services/vendor.service';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { ListResult } from 'app/_services/base-api.service';
import { Observable } from 'rxjs';
import { FormConfig, FORM_TYPES } from 'app/components/custom-form/custom-form.component';
import { ChoiceName } from 'app/components/multi-select/multi-select.component';

enum TABS {
  vendors = 'vendor', types = 'type'
}

enum ACTIONS {EDIT = '1', DELETE = '2'}
@Component({
  selector: 'ngx-training-vendor',
  templateUrl: './training-vendor.component.html',
  styleUrls: ['./training-vendor.component.scss']
})
export class TrainingVendorComponent extends BaseComponent<MyVendor, {}, MyVendor> {
  filter: {} = {};
  validator = {};
  data: MyVendor[];
  uploadVendor = true;
  getData(): Observable<ListResult<MyVendor>> {
    return this.api.list(this.filter);
  }
  saveData(): Observable<any> {
    if (this.editingData.uploadFile) {
      return this.api.upload({data: this.editingData.uploadFile.flowFile.file, fileName: 'aaa'});
    }
    const obj = new MyVendor();
    Object.assign(obj, this.editingData);
    return this.api.create(obj);
  }
  getNewEditingData(): MyVendor {
    return new MyVendor();
  }
  successMessage: string = "";
  deleteData(data: MyVendor): Observable<any> {
    throw new Error('Method not implemented.');
  }
  tableActionClicked(event: TableActionEvent) {
    this.editingData = event.data;
    if (event.name === ACTIONS.EDIT) {
      this.showModal = true;
    }
    if (event.name === ACTIONS.DELETE) {
      this.deleteRow();
    }
  }

  tableActions: TableAction[] = [
    {name: ACTIONS.EDIT, label: 'Edit'},
    {name: ACTIONS.DELETE, label: 'Delete'},
  ];
  constructor(
    protected confirmBox: ConfirmBoxService,
    private api: VendorService,
    protected alertService: AlertserviceService,
  ) {
    super(confirmBox);
  }
  actions: TopAction[] = [
    {name: 'create', label: 'Create New', icon: 'plus'}
  ];

  welcome: boolean = true;
  newTraining: boolean = false;
  vendorWindow: boolean = false;
  trainingType: boolean = true;
  newTrainingType: boolean = false;
  trainingCategory: boolean = true;
  category = 'Internal';

  TrainingTypeData = '';
  TrainingVendorData = '';

  addVendor = 'Add New Vendor';
  addType = 'Add Training Type';

  myVendorTable: TableColumn [] = [
    {name: 'name', title: 'Name'},
    {name: 'email', title: 'Email'},
    {name: 'phone', title: 'Phone'},
    {name: 'website', title: 'Specialization'},
    {name: 'startDate', title: 'Start Date'},
    {name: 'endDate', title: 'End Date'} ];

  tableColumns: TableColumn [] = [
    {name: 'title', title: 'Title'},
    {name: 'vendor', title: 'Vendor'},
    {name: 'category', title: 'Category'},
    {name: 'cost', title: 'Cost/Head'},
    {name: 'trainees', title: 'Trainess'}];

  get rButton() {
    return [{name: 'newVendor', label: this.selectedTab == TABS.vendors ? 'New Vendor' : 'New Type', icon: 'plus'}];
  }

  formConfig: FormConfig = {
    fields: [
      {name: 'name', label: 'Vendor Name', type: FORM_TYPES.text},
      {name: 'contactPerson', label: 'Primary Contact Person',
          type: FORM_TYPES.employee, singleSelection: true},
      {name: 'phoneNo', label: 'Phone No', type: FORM_TYPES.text},
      {name: 'email', label: 'Email', type: FORM_TYPES.text},
      {name: 'website', label: 'Website', type: FORM_TYPES.text},
      {name: 'trainingSpecializationId', label: 'Specialization',
          type: FORM_TYPES.select,
          choice_name: ChoiceName.trainingSpecialization, singleSelection: true},
    ]

    // fields: [
    //   {name: 'title', label: 'Title', type: FORM_TYPES.text},
    //   {name: 'specialization', label: 'Specialization',
    //       type: FORM_TYPES.select,
    //       choice_name: ChoiceName.trainingSpecia1lization, singleSelection: true},
    //   {name: 'category', label: 'Caregory', type: FORM_TYPES.select,
    //       choice_name: ChoiceName.trainingCategory, singleSelection: true},
    //   {name: 'cost_per_head', label: 'Cost per head', type: FORM_TYPES.amount},
    //   {name: 'no_of_trainees', label: 'No of trainees', type: FORM_TYPES.number},
    //   {name: 'total_cost', label: 'Overall budget cost', type: FORM_TYPES.number, disabled: true},
    //   {name: 'file', label: 'Content', type: FORM_TYPES.file},
    //   {name: 'title', label: 'Resource Person', type: FORM_TYPES.employee, singleSelection: true},
    // ]
  };
  formTitle = 'Add new Type';
}
