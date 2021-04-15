import { AlertserviceService } from './../../../_services/alertservice.service';
import { NgForm } from '@angular/forms';
import { Grade, LoanRepaymentLog } from 'app/_services/service-proxies';
import { CommonServiceProxy, LoanTypeDTO, AddUpdateLoanTypeServiceProxy, IdNameObj, PostLoanDto, LoadRepaymentScheduleServiceProxy, SimulatePaymentServiceProxy, GetLoanSummaryServiceProxy, PostFullRepaymentServiceProxy } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-loan-type',
  templateUrl: './loan-type.component.html',
  styleUrls: ['./loan-type.component.scss']
})
export class LoanTypeComponent implements OnInit {

  loanType: NgForm;
  loanTypeModel: LoanTypeDTO = new LoanTypeDTO();
  allGrades: Grade [] = [];
  isGuarantor:boolean = false;
  isActiveState:boolean = true;
  allRepaymentSchedule: LoanRepaymentLog [] = [];
  simulateData: LoanRepaymentLog [] = [];
  loanId: number = 0;
  loanSummary: IdNameObj [] = [];
  loanData: PostLoanDto = new PostLoanDto().clone()

  constructor(private commonService: CommonServiceProxy, private alertMe: AlertserviceService, private repaymentService: LoadRepaymentScheduleServiceProxy,
    private updateLoanService: AddUpdateLoanTypeServiceProxy, private simulateService: SimulatePaymentServiceProxy,
    private summaryService: GetLoanSummaryServiceProxy, private fullpaymentService: PostFullRepaymentServiceProxy) { }

  ngOnInit(): void {
    this.getGrades();
    this.fetchRepaymentSchedule();
    this.fetchRepaymentSchedule();
  }

  async createLoanType(){
    const data = await this.updateLoanService.addUpdateLoanType(this.loanTypeModel).toPromise();
    if(!data.hasError){
      this.alertMe.openModalAlert('Success', 'Loan Type has been created!', 'Dismiss')
    }

    else {
      this.alertMe.openModalAlert('Failure!', 'could not add typle', 'Dismiss')
    }
  }

  async getGrades(){
  const data = await this.commonService.getGrades().toPromise();
  if(!data.hasError){
    this.allGrades = data.result;
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
      this.simulateData = data.result;
    }
  }

  async fetchLoanSummary(){
    const data = await this.summaryService.getLoanSummary(this.loanId).toPromise();
    if(!data.hasError){
      this.loanSummary = data.result;
    }
  }


  toggleGuarantor(event){
    this.isGuarantor = event
  }

  async postFullPayment(){
    const data = await this.fullpaymentService.postFullRepayment(this.loanData).toPromise();
    if(!data.hasError){
      this.alertMe.openModalAlert('Success', 'Repayment Posted!', 'Dismiss')
    }
  }

}
