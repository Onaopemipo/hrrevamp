import { Component, OnInit } from '@angular/core';
import { ColumnTypes, TableColumn } from 'app/components/tablecomponent/models';
import { MainBaseComponent } from 'app/components/main-base/main-base.component';


enum TABS { ALL__REQUESTS, APPROVED, PENDING, DECLINED, }
enum TOP_ACTIONS { CREATE_NEW, }



@Component({
  selector: 'ngx-expense-request',
  templateUrl: './expense-request.component.html',
  styleUrls: ['./expense-request.component.scss']
})
export class ExpenseRequestComponent extends MainBaseComponent {
  topActionButtons = [
    { name: 'CREATE_NEW', label: 'Create new', icon: 'plus', outline: false },
  ]
  TOP_ACTIONS = TOP_ACTIONS;
  TABS = TABS;
  selectedTab = TABS.ALL__REQUESTS;
  tableColumns = [
    { name: 'date', title: 'REF ID' },
    { name: 'date', title: 'Employee' },
    { name: 'date', title: 'Project' },
    { name: 'date', title: 'Type' },
    { name: 'date', title: 'Amount' }
  ]
}
