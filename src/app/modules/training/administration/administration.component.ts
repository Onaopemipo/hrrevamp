import { NbTabComponent } from '@nebular/theme';
import { TableColumn } from './../../../components/tablecomponent/models';
import { TopAction } from './../../../components/componentsheader/models';
import { Component, OnInit } from '@angular/core';
import { TAB } from '@angular/cdk/keycodes';

enum TABS {
  vendors = 'vendor', types = 'type'
}
@Component({
  selector: 'ngx-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  constructor() { }
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

  ngOnInit(): void {
  }

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

  }

  uploadVendor() {
    this.vendorWindow = true;
    this.newTraining = false;
    this.welcome = false;
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
