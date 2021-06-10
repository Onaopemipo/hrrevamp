import { AlertserviceService } from './../../../_services/alertservice.service';
import { TableColumn, TableAction, TableActionEvent } from 'app/components/tablecomponent/models';
import { LoanRequestDTOs, GetLoanRequestsServiceProxy, DeleteLoanRequestServiceProxy, CompetencyServiceProxy } from './../../../_services/service-proxies';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


enum TABLE_ACTION {
  PROCESS = '1',
  DELETE = '2',
  // EDIT = '3',
  SUMMARY = '4'
}
@Component({
  selector: 'ngx-all-loans',
  templateUrl: './all-loans.component.html',
  styleUrls: ['./all-loans.component.scss']
})
export class AllLoansComponent implements OnInit {

  tableActions: TableAction[] = [
    {name: TABLE_ACTION.PROCESS, label: 'Process'},
    // {name: TABLE_ACTION.EDIT, label: 'Edit'},
    {name: TABLE_ACTION.DELETE, label: 'Delete'},

  ]

  tableActionClicked(event: TableActionEvent){
    if(event.name == TABLE_ACTION.DELETE){
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.CONFIRM, '?', 'Yes').subscribe(dataAction => {
        if(dataAction == 'closed'){
          this.deleteService.deleteLoanRequest(event.data.id).subscribe(data => {
            if(!data.hasError && data.result.isSuccessful == true){
              this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Loan Request has been deleted','OK').subscribe(delData =>{
                if(delData) this.router.navigateByUrl('/loan')
              })
            }
          })
        }
      })
    }
    else if(event.name==TABLE_ACTION.PROCESS){
     this.router.navigateByUrl('/loan/process-loan/' + event.data.id)
      }

      // else if(event.name==TABLE_ACTION.EDIT){
      //  this.router.navigateByUrl('/loan/request' + event.data.id)
      //   }
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
    {name: 'loggedForEmployeeId', title: 'Employee Id'},
    {name: 'loggedForEmployeeName', title: 'Employee Name'},
    {name: 'requestedAmount', title: 'Requested Amount'},
    {name: 'approvedTenor', title: 'Approved Tenor'},
    {name: 'loanTypeName', title: 'Loan Type'},

  ];

  filter = {

  }

  loading:boolean = true;
  allLoansData: LoanRequestDTOs [] = [];
  loansCounter: number = 0;
  btnProcessing: boolean = false;

  constructor(private router: Router, private getLoans: GetLoanRequestsServiceProxy,
    private deleteService: DeleteLoanRequestServiceProxy, private alertMe: AlertserviceService) { }

  ngOnInit(): void {
    this.fetchLoans();
  }

  filterUpdated(filter: any) {
    this.filter = {...this.filter, ...filter};
    this.fetchLoans()
  }

  addRequest() {
    this.router.navigateByUrl('/loan/request');
  }

  fetchLoans(){
    this.loading = true;
    this.getLoans.getLoanRequests(undefined,undefined,2,'',10,1).subscribe(data => {
      this.loading = false;
      if(!data.hasError){
        this.allLoansData = data.result;
        this.loansCounter = data.totalRecord;
        console.log('my counter', this.loansCounter)
    }
  }, (error) => {

    if (error.status == 400) {
      this.loading = false;
      this.alertMe.openCatchErrorModal(this.alertMe.ALERT_TYPES.FAILED, error.title, "OK", error.errors);
    }
  });
}

}
