import { FetchExpensesServiceProxy, ExpenseDTO } from './../../../../_services/service-proxies';
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

  tableActions = [{}];
  myHeader: string = 'No request found';
  requestCounter: number = 0;
  characters: string ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  constructor(private disbursement: DisbursementService, private alert: AlertserviceService,
    private request: FetchExpensesServiceProxy) { }

  ngOnInit(): void {
    this.allDisbursementRequest();
    this.makeTempRef();
    console.log(this.generateString(10));
  }

  selectedTab = TABS.ALL_REQUESTS;
  allDisbursements: ExpenseDTO [] = [];
  tempRef: any = '';

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

  makeTempRef(){
    let result = [];
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = 12;
    for( let i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random()*charactersLength)));
      this.tempRef = result;
   }
   console.log('I amcvvddd here',this.tempRef)
}

generateString(length) {
  let result = '';
  const charactersLength = this.characters.length;
  for (let i = 0; i < length; i++ ) {
    this.tempRef += this.characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  this.tempRef = result;
  console.log('Here is your string',this.tempRef)
}


getTableActions (){
  if(TABS.ALL_REQUESTS){
    this.tableActions = [{name: 'pending', label:'Pending'},
    {name: 'disburse', label:'Disburse'},
  ]
  } else if(TABS.DISBURSED){
    this.tableActions = [{name: 'view', label:'View'},
    // {name: 'disburse', label:'Disburse'},
  ]
  } else if(TABS.FAILED){
    this.tableActions = [{name: 'view', label:'View'},
    // {name: 'disburse', label:'Disburse'},
  ]
  } else if(TABS.PENDING){
    this.tableActions = [{name: 'view', label:'View'},
    // {name: 'disburse', label:'Disburse'},
  ]
  }
}

  async allDisbursementRequest(){
    const data = await this.request.fetchExpenses(0,0,0,0,0,'','','',0,0,0).toPromise();
    if(!data.hasError){
      this.allDisbursements = data.result;
      this.requestCounter = data.totalRecord;
      console.log('Hello!', this.allDisbursementRequest)
    }
  }

}
