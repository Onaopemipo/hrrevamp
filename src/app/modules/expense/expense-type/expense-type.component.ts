import { Component, OnInit } from '@angular/core';
import { ColumnTypes, TableColumn } from 'app/components/tablecomponent/models';
import { MainBaseComponent } from 'app/components/main-base/main-base.component';


enum TABS { PROJECTS, TYPES, }
enum TOP_ACTIONS { CREATE_NEW, }



@Component({
  selector: 'ngx-expense-type',
  templateUrl: './expense-type.component.html',
  styleUrls: ['./expense-type.component.scss']
})
export class ExpenseTypeComponent extends MainBaseComponent {
  topActionButtons = [
    { name: 'CREATE_NEW', label: 'Add Expense Type', icon: 'plus', outline: false },
  ];
  TOP_ACTIONS = TOP_ACTIONS;
  TABS = TABS;
  selectedTab = TABS.PROJECTS;
  tableColumns = [
    { name: 'date', title: 'REF ID' },
    { name: 'date', title: 'Name' },
    { name: 'date', title: 'Sub-Type' },
    { name: 'date', title: 'Budget Code' }
  ];
}
