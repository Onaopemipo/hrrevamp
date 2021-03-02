import { Component, OnInit } from '@angular/core';
import { ColumnTypes, TableColumn } from 'app/components/tablecomponent/models';
import { MainBaseComponent } from 'app/components/main-base/main-base.component';


enum TABS { PROJECTS, TYPES, }
enum TOP_ACTIONS { CREATE_NEW, }



@Component({
  selector: 'ngx-expense-management',
  templateUrl: './expense-management.component.html',
  styleUrls: ['./expense-management.component.scss']
})
export class ExpenseManagementComponent extends MainBaseComponent {
  topActionButtons = [
    { name: 'CREATE_NEW', label: 'Create new', icon: 'plus', outline: false },
  ];
  TOP_ACTIONS = TOP_ACTIONS;
  TABS = TABS;
  selectedTab = TABS.PROJECTS;
  tableColumns = [
    { name: 'date', title: 'REF ID' },
    { name: 'date', title: 'Name' },
    { name: 'date', title: 'Start Date' },
    { name: 'date', title: 'End Date' },
    { name: 'date', title: 'Status' }
  ];
}
