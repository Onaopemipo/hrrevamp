import { TableColumn, TableAction, TableActionEvent } from 'app/components/tablecomponent/models';
import { LoanRequestDTOs, GetLoanRequestsServiceProxy } from './../../../_services/service-proxies';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


enum TABLE_ACTION {
  PROCESS = '1',
  DELETE = '2',
  EDIT = '3'
}
@Component({
  selector: 'ngx-all-loans',
  templateUrl: './all-loans.component.html',
  styleUrls: ['./all-loans.component.scss']
})
export class AllLoansComponent implements OnInit {

  tableActions: TableAction[] = [
    {name: TABLE_ACTION.PROCESS, label: 'Process'},
    {name: TABLE_ACTION.EDIT, label: 'Edit'},
    {name: TABLE_ACTION.DELETE, label: 'Delete'},

  ]

  tableActionClicked(event: TableActionEvent){
    if(event.name == TABLE_ACTION.DELETE){
      this.router.navigateByUrl('' + event.data.id)
    }
    else if(event.name==TABLE_ACTION.PROCESS){
     this.router.navigateByUrl('loan/process' + event.data.id)
      }

      else if(event.name==TABLE_ACTION.EDIT){
       this.router.navigateByUrl('/' + event.data.id)
        }
 }


  dataVal: number = 2;
  allLoans: LoanRequestDTOs [] = [];
  myHeader: string = 'No Record Found';
  myButton: string = 'Click to request';
  myDescription: string = 'No Loan request has been made yet';

  repaymentTable: TableColumn [] = [
    {name: 'sn', title: 'SN'},
    {name: 'repaymentDate', title: 'Repayment Date'},
    {name: 'principalAmount', title: 'Principal Amount'},
    {name: ' interestAmount', title: 'Interest Amount'},
    {name: ' totalAmount', title: 'Total Amount'},
    {name: ' amountPaid', title: 'Amount Paid'},
    {name: ' comment', title: 'Comment'},

  ];

  loanRequestTable: TableColumn [] = [
    {name: 'employeeNo', title: 'Employee No.'},
    {name: 'employeeName', title: 'Employee Name'},
    {name: 'approvedAmount', title: 'Loan Amount'},
    {name: 'approvedTenor', title: 'Approved Tenor'},
    {name: 'loanTypeName', title: 'Loan Type'},

  ];

  loading:boolean = true;
  allLoansData: LoanRequestDTOs [] = [];
  loansCounter: number = 0;

  constructor(private router: Router, private getLoans: GetLoanRequestsServiceProxy,) { }

  ngOnInit(): void {
    this.fetchLoans();
  }

  addRequest() {
    this.router.navigateByUrl('/loan/request');
  }

  async fetchLoans(){
    const data = await this.getLoans.getLoanRequests(null,null,2,'',10,1).toPromise();
    console.log('My data',data);
    if(!data.hasError){
      this.allLoansData = data.result;
      this.loansCounter = data.totalRecord;
      console.log('my counter', this.loansCounter)
      if(this.loansCounter > 0) this.loading = false;
  }

}

}
