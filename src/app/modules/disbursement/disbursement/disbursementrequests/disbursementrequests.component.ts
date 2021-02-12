import { T } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { ColumnTypes, TableColumn } from 'app/components/tablecomponent/models';

enum TABS {
  ALL_REQUESTS, DISBURSED, PENDING, FAILED,
}

@Component({
  selector: 'ngx-disbursementrequests',
  templateUrl: './disbursementrequests.component.html',
  styleUrls: ['./disbursementrequests.component.scss']
})
export class DisbursementrequestsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  selectedTab = TABS.ALL_REQUESTS;

  selectTab(tab: TABS) {
    this.selectedTab = tab;
  }

  TABS = TABS;

  tableColumns: TableColumn[] = [
    {name: 'ref_no', title: 'REF NO', type: ColumnTypes.Text},
    {name: 'project', title: 'Project', type: ColumnTypes.Text},
    {name: 'type', title: 'Type', type: ColumnTypes.Text},
    {name: 'amount', title: 'Amount', type: ColumnTypes.Text},
    {name: 'status', title: 'Status', type: ColumnTypes.Text},
  ];
  tableData = [];

}
