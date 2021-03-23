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

enum TABS {
  vendors = 'vendor', types = 'type'
}

enum ACTIONS {EDIT = '1', DELETE = '2'}
@Component({
  selector: 'ngx-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent extends BaseComponent<MyVendor, {}, MyVendor> {
  filter: {} = {};
  validator = {};
  data: MyVendor[];
  getData(): Observable<ListResult<MyVendor>> {
    return this.vendor_api.list(this.filter);
  }
  saveData(): Observable<any> {
    if (this.uploadVendor) {
      return this.vendor_api.upload({data: this.editingData.uploadFile.flowFile.file, fileName: 'aaa'});
    }
    return this.vendor_api.create(this.editingData);
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
      this.deleteRow('Are you sure to delete this department?');
    }
  }

  tableActions: TableAction[] = [
    {name: ACTIONS.EDIT, label: 'Edit'},
    {name: ACTIONS.DELETE, label: 'Delete'},
  ];
  constructor(
    protected confirmBox: ConfirmBoxService,
    private vendor_api: VendorService,
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

  myTable: TableColumn [] = [
    {name: 'title', title: 'Title'},
    {name: 'vendor', title: 'Vendor'},
    {name: 'category', title: 'Category'},
    {name: 'cost', title: 'Cost/Head'},
    {name: 'trainees', title: 'Trainess'}];

  get pagetitle() {
    return 'Training Administration';
  }

  addTraining() {
    if (this.selectedTab == TABS.vendors) {
      console.log('Vendors');
      this.newTraining = true;
      this.welcome = false;
    } else {
      console.log('Types');
      this.newTrainingType = true;
      this.trainingType = false;
    }
    this.showModal = true;
  }

  uploadVendor = false;

  toggleUploadVendor() {
    this.uploadVendor = !this.uploadVendor;
  }

  addNewTraining() {
    this.newTrainingType = true;
    this.trainingType = false;
  }

  changed(data) {

  }


  TABS = TABS;
  selectedTab = TABS.vendors;

  tabSelected(tab: NbTabComponent) {
    const b: any = tab.tabId;
    console.log(tab);
    this.selectedTab = b;
  }

  get rButton() {
    return [{name: 'newVendor', label: this.selectedTab == TABS.vendors ? 'New Vendor' : 'New Type', icon: 'plus'}];
  }
}
