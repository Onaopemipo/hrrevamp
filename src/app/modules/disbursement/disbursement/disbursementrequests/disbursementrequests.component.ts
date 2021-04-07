import { T } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnTypes, TableColumn } from 'app/components/tablecomponent/models';
import {DisbursementService,MyDisbursement} from '../../services/disbursement.service'
enum TABS {
  ALL_REQUESTS, DISBURSED, PENDING, FAILED,
}

enum TOP_ACTIONS {
  SUBMIT_LIST,
}
@Component({
  selector: 'ngx-disbursementrequests',
  templateUrl: './disbursementrequests.component.html',
  styleUrls: ['./disbursementrequests.component.scss']
})
export class DisbursementrequestsComponent implements OnInit {
  topActionButtons = [
    {name: TOP_ACTIONS.SUBMIT_LIST, label: 'Create Disbursement Request', 'icon': 'plus', outline: true},
   
  ];


  constructor(private disbursementService : DisbursementService,private router:Router) { }
 filter:MyDisbursement
  ngOnInit(): void {
    this.disbursementService.list(this.filter).subscribe(disbursement => {
      this.tableData = disbursement.data
      console.log(disbursement);
    })
  }

  selectedTab = TABS.ALL_REQUESTS;

  selectTab(tab: TABS) {
    this.selectedTab = tab;
  }

  TABS = TABS;

  tableColumns: TableColumn[] = [
    {name: 'ref_no', title: 'REF NO', type: ColumnTypes.Text},
    {name: 'budget_item_name', title: 'Budget Item Name', type: ColumnTypes.Text},
    // {name: 'type', title: 'Type', type: ColumnTypes.Text},
    {name: 'amount', title: 'Amount', type: ColumnTypes.Text},
    {name: 'status', title: 'Status', type: ColumnTypes.Status},
  ];
  tableData: MyDisbursement[] = [];
  modal(event){
    if(event==TOP_ACTIONS.SUBMIT_LIST){
      this.router.navigateByUrl('/disbursement/disbursement/create')
    }
  }
}
