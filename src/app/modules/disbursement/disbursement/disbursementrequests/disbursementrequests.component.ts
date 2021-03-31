import { AlertserviceService } from 'app/_services/alertservice.service';
import { DisbursementService, MyDisbursement } from './../../services/disbursement.service';
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

  constructor(private disbursement: DisbursementService, private alert: AlertserviceService) { }

  ngOnInit(): void {
    this.getDisbursement()
  }

  selectedTab = TABS.ALL_REQUESTS;
  allDisbursements: MyDisbursement = new MyDisbursement;

  selectTab(tab: TABS) {
    this.selectedTab = tab;
  }

  TABS = TABS;

  AllRequest: TableColumn[] = [
    {name: 'ref_no', title: 'REF NO', type: ColumnTypes.Text},
    {name: 'project', title: 'Project', type: ColumnTypes.Text},
    {name: 'type', title: 'Type', type: ColumnTypes.Text},
    {name: 'amount', title: 'Amount', type: ColumnTypes.Text},
    {name: 'status', title: 'Status', type: ColumnTypes.Text},
  ];

  Disbursed: TableColumn[] = [
    {name: 'ref_no', title: 'REF NO', type: ColumnTypes.Text},
    {name: 'project', title: 'Project', type: ColumnTypes.Text},
    {name: 'type', title: 'Type', type: ColumnTypes.Text},
    {name: 'amount', title: 'Amount', type: ColumnTypes.Text},

  ];

  Pending: TableColumn[] = [
    {name: 'ref_no', title: 'REF NO', type: ColumnTypes.Text},
    {name: 'project', title: 'Project', type: ColumnTypes.Text},
    {name: 'type', title: 'Type', type: ColumnTypes.Text},
    {name: 'amount', title: 'Amount', type: ColumnTypes.Text},

  ];
  Failed: TableColumn[] = [
    {name: 'ref_no', title: 'REF NO', type: ColumnTypes.Text},
    {name: 'project', title: 'Project', type: ColumnTypes.Text},
    {name: 'type', title: 'Type', type: ColumnTypes.Text},
    {name: 'amount', title: 'Amount', type: ColumnTypes.Text},

  ];

  tableData = [];


  async getDisbursement(){
    const data = await this.disbursement.list(this.allDisbursements).toPromise();
    this.alert.openModalAlert('success', 'Data has been added', 'Dismiss')
    console.log(data)
  }

}
