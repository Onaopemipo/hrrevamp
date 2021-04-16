import { LoanRepaymentLog, LoadRepaymentScheduleServiceProxy, SimulatePaymentServiceProxy } from './../../../_services/service-proxies';
import { TableColumn } from './../../../components/tablecomponent/models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-process-request',
  templateUrl: './process-request.component.html',
  styleUrls: ['./process-request.component.scss']
})
export class ProcessRequestComponent implements OnInit {

  loanRequestTable: TableColumn [] = [
    {name: 'sn', title: 'SN'},
    {name: 'repaymentDate', title: 'Repayment Date'},
    {name: 'principalAmount', title: 'Principal Amount'},
    {name: ' interestAmount', title: 'Interest Amount'},
    {name: ' totalAmount', title: 'Total Amount'},
    {name: ' amountPaid', title: 'Amount Paid'},
    {name: ' comment', title: 'Comment'},

  ];

  repaymentData: LoanRepaymentLog [] = [];
  simulationData: LoanRepaymentLog [] = [];

  constructor(private repaymentService: LoadRepaymentScheduleServiceProxy, private simulateService: SimulatePaymentServiceProxy) { }

  ngOnInit(): void {
    this.fetchRepayment();
  }

  async fetchRepayment(){
    const data = await this.repaymentService.loadRepaymentSchedule(1,1).toPromise();
    if(!data.hasError){
      this.repaymentData = data.result;
    }
  }

  async simulateLoanRepayment(){
    const data = await this.simulateService.simulatePayment(1,1,1,1,'').toPromise();
    if(!data.hasError){
      this.simulationData = data.result;
    }
  }

}
