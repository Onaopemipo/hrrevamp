import { T } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { ColumnTypes, TableColumn } from 'app/components/tablecomponent/models';

enum TABS {
  SINGLE, BULK, RECURRING, PAYSLIP,
}

@Component({
  selector: 'ngx-disbursement-history',
  templateUrl: './disbursement-history.component.html',
  styleUrls: ['./disbursement-history.component.scss']
})
export class DisbursementHistoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  selectedTab = TABS.SINGLE;

  selectTab(tab: TABS) {
    this.selectedTab = tab;
  }

  TABS = TABS;

  get tableColumns(): TableColumn[] {
    switch (this.selectedTab) {
      case TABS.SINGLE: {
        return [
          {name: 'ref_no', title: 'BUDGET ITEM', type: ColumnTypes.Text},
          {name: 'project', title: 'ACCOUNT NAME', type: ColumnTypes.Text},
          {name: 'type', title: 'ACCOUNT NUMBER', type: ColumnTypes.Text},
          {name: 'amount', title: 'AMOUNT', type: ColumnTypes.Text},
          {name: 'status', title: 'DISBURSEMENT DATE', type: ColumnTypes.Text},
          {name: 'status', title: 'STATUS', type: ColumnTypes.Text},
        ];
      }
      case TABS.BULK: {
        return [
          {name: 'ref_no', title: 'INITIATED BY', type: ColumnTypes.Text},
          {name: 'project', title: 'BENEFICIARIES', type: ColumnTypes.Text},
          {name: 'type', title: 'CHANNEL', type: ColumnTypes.Text},
          {name: 'amount', title: 'DATE INITIATED', type: ColumnTypes.Text},
          {name: 'status', title: 'STATUS', type: ColumnTypes.Text},
        ];
      }
      case TABS.RECURRING: {
        return [
          {name: 'ref_no', title: 'FREQUENCY', type: ColumnTypes.Text},
          {name: 'project', title: 'INITIATED BY', type: ColumnTypes.Text},
          {name: 'type', title: 'LAST RECUR DATE', type: ColumnTypes.Text},
          {name: 'amount', title: 'NEXT RECUR DATE', type: ColumnTypes.Text},
          {name: 'status', title: 'NO of RUN', type: ColumnTypes.Text},
          {name: 'status', title: 'STATUS', type: ColumnTypes.Text},
        ];
      }
      case TABS.PAYSLIP: {
        return [
          {name: 'ref_no', title: 'ACCOUNT NAME', type: ColumnTypes.Text},
          {name: 'project', title: 'ACCOUNT NUMBER', type: ColumnTypes.Text},
          {name: 'type', title: 'AMOUNT', type: ColumnTypes.Text},
          {name: 'amount', title: 'DISBURSEMENT DATE', type: ColumnTypes.Text},
          {name: 'status', title: 'STATUS', type: ColumnTypes.Text},
        ];
      }
      default: {
        return [
          {name: 'ref_no', title: 'BUDGET ITEM', type: ColumnTypes.Text},
          {name: 'project', title: 'ACCOUNT NAME', type: ColumnTypes.Text},
          {name: 'type', title: 'ACCOUNT NUMBER', type: ColumnTypes.Text},
          {name: 'amount', title: 'AMOUNT', type: ColumnTypes.Text},
          {name: 'status', title: 'DISBURSEMENT DATE', type: ColumnTypes.Text},
          {name: 'status', title: 'STATUS', type: ColumnTypes.Text},
        ];
      }
    }
  }
  tableData = [];

getHistory(){

}

}
