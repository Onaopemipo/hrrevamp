import { Router, ActivatedRoute } from '@angular/router';
import { AlertserviceService } from './../../../_services/alertservice.service';
import { LoanRepaymentLog, LoadRepaymentScheduleServiceProxy, SimulatePaymentServiceProxy, PostFullRepaymentServiceProxy, GetLoanSummaryServiceProxy, IdNameObj, PostLoanDto, GetLoanRequestServiceProxy, LoanRequestDTOs } from './../../../_services/service-proxies';
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

  filter = {

  }

  repaymentData: LoanRepaymentLog [] = [];
  simulationData: LoanRepaymentLog [] = [];
  allRepaymentSchedule: LoanRepaymentLog [] = [];
  loanId: number = 0;
  loanSummary: IdNameObj [] = [];
  loanData: PostLoanDto = new PostLoanDto().clone();
  singleLoanData: LoanRequestDTOs = new LoanRequestDTOs().clone();
  recompute: number = 0;
  loading:boolean = false;
  repaymentCounter: number = 0;

  constructor(private repaymentService: LoadRepaymentScheduleServiceProxy, private simulateService: SimulatePaymentServiceProxy,
    private summaryService: GetLoanSummaryServiceProxy, private fullpaymentService: PostFullRepaymentServiceProxy,
    private alertMe: AlertserviceService, private router: ActivatedRoute, private service: GetLoanRequestServiceProxy) { }

  ngOnInit(): void {
    // this.fetchRepayment();
    this.service.getLoanRequest(this.loanId = Number(this.router.snapshot.paramMap.get("id"))).subscribe(data => {
      if(!data.hasError){
        this.singleLoanData = data.result;
      }
    })
    //  this. fetchSingleLoan();
  }

  filterUpdated(filter: any) {
    this.filter = {...this.filter, ...filter};
    // this.fetchLoans()
  }

  async fetchRepayment(){
    const data = await this.repaymentService.loadRepaymentSchedule(this.loanId,1).toPromise();
    if(!data.hasError){
      this.repaymentData = data.result;
      this.repaymentCounter = data.totalRecord;
      console.log(this.repaymentData);
    }
  }

  async simulateLoanRepayment(){
    this.loading = true
    let principal:number = this.singleLoanData.approvedAmount;
    let interestType = this.singleLoanData.loanTypeId;
    let tenor = this.singleLoanData.approvedTenor;
    let effectiveDate = this.singleLoanData.effectiveDate;
    const data = await this.simulateService.simulatePayment(1,1,1,1,undefined).toPromise();
    this.loading = false;
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
    const data = await this.simulateService.simulatePayment(0,0,0,0,null).toPromise();
    if(!data.hasError){
      this.simulationData = data.result;
    }
  }

  // fetchSingleLoan(){
  //   this.service.getLoanRequest(this.loanId).subscribe(data => {
  //     if(!data.hasError){
  //       this.singleLoanData = data.result;
  //     }
  //   })
  // }

  async fetchLoanSummary(){
    const data = await this.summaryService.getLoanSummary(this.loanId).toPromise();
    if(!data.hasError){
      this.loanSummary = data.result;
    }
  }

  async postFullPayment(){
    const data = await this.fullpaymentService.postFullRepayment(this.loanData).toPromise();
    if(!data.hasError){
      this.alertMe.openModalAlert('Success', 'Repayment Posted!', 'OK')
    }
  }

}
