import { Component, OnInit } from '@angular/core';
import { ColumnTypes, TableColumn } from 'app/components/tablecomponent/models';
import { MainBaseComponent } from 'app/components/main-base/main-base.component';


enum TOP_ACTIONS { }



@Component({
  selector: 'ngx-expense-report',
  templateUrl: './expense-report.component.html',
  styleUrls: ['./expense-report.component.scss']
})
export class ExpenseReportComponent extends MainBaseComponent {
  topActionButtons = [
  ];
  TOP_ACTIONS = TOP_ACTIONS;
  tableColumns = [
    { name: 'date', title: 'REF ID' },
    { name: 'date', title: 'Employee Name' },
    { name: 'date', title: 'Project' },
    { name: 'date', title: 'Type' },
    { name: 'date', title: 'Approved Amount' },
    { name: 'date', title: 'Approval Status' },
    { name: 'date', title: 'Disbursement Status' }
  ]
}
