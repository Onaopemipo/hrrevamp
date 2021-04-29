import { TableColumn } from 'app/components/tablecomponent/models';
import { LoanRequestDTOs, GetLoanRequestsServiceProxy } from './../../../_services/service-proxies';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-all-loans',
  templateUrl: './all-loans.component.html',
  styleUrls: ['./all-loans.component.scss']
})
export class AllLoansComponent implements OnInit {

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

  loading:boolean = true;
  constructor(private router: Router, private loanService: GetLoanRequestsServiceProxy) { }

  ngOnInit(): void {
    this.fetchLoans();
  }

  addRequest() {
    this.router.navigateByUrl('/loan/all-loans');
  }

  async fetchLoans(){
    const data = await this.loanService.getLoanRequests(null,null, 1,'',10,1).toPromise();
    if(!data.hasError){
      this.allLoans = data.result;
      console.log('all loans', this.allLoans)
    }
  }

}
