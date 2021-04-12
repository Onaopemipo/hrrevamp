import { LoadRepaymentScheduleServiceProxy, LoanRepaymentLog, SimulatePaymentServiceProxy } from './../../../_services/service-proxies';
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

  constructor(private loanRepayment: LoadRepaymentScheduleServiceProxy, private simulation: SimulatePaymentServiceProxy) { }

  ngOnInit(): void {
    this.fetchRepayment();
  }

  async fetchRepayment(){
    const data = await this.loanRepayment.loadRepaymentSchedule(1,1).toPromise();
    if(!data.hasError){
      this.repaymentData = data.result;
    }
  }

  async simulateLoan(){
    const data = await this.simulation.simulatePayment(1,1,1,1,'').toPromise();
    if(!data.hasError){
      this.simulationData = data.result;
    }
  }

}
