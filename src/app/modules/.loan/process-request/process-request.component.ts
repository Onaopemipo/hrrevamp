import { AlertserviceService } from './../../../_services/alertservice.service';
import { LoanRepaymentLog, LoadRepaymentScheduleServiceProxy, SimulatePaymentServiceProxy, PostFullRepaymentServiceProxy, GetLoanSummaryServiceProxy, IdNameObj, PostLoanDto } from './../../../_services/service-proxies';
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
  allRepaymentSchedule: LoanRepaymentLog [] = [];
  loanId: number = 0;
  loanSummary: IdNameObj [] = [];
  loanData: PostLoanDto = new PostLoanDto().clone()

  constructor(private repaymentService: LoadRepaymentScheduleServiceProxy, private simulateService: SimulatePaymentServiceProxy,
    private summaryService: GetLoanSummaryServiceProxy, private fullpaymentService: PostFullRepaymentServiceProxy,
    private alertMe: AlertserviceService,) { }

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

  async fetchRepaymentSchedule(){
    const data = await this.repaymentService.loadRepaymentSchedule(0,0).toPromise();
    if(!data.hasError){
      this.allRepaymentSchedule = data.result;
      console.log(data.message)
    } else {
      console.log(data.message)
    }
  }

  async fetchSimulateRepayment(){
    const data = await this.simulateService.simulatePayment(0,0,0,0,'').toPromise();
    if(!data.hasError){
      this.simulationData = data.result;
    }
  }

  async fetchSingleLoan(){
    // const data = await this.singleLoan.
  }

  async fetchLoanSummary(){
    const data = await this.summaryService.getLoanSummary(this.loanId).toPromise();
    if(!data.hasError){
      this.loanSummary = data.result;
    }
  }

  async postFullPayment(){
    const data = await this.fullpaymentService.postFullRepayment(this.loanData).toPromise();
    if(!data.hasError){
      this.alertMe.openModalAlert('Success', 'Repayment Posted!', 'Dismiss')
    }
  }

}
