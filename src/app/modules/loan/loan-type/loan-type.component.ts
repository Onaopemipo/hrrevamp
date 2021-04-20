import { TableColumn, TableAction } from './../../../components/tablecomponent/models';
import { AlertserviceService } from './../../../_services/alertservice.service';
import { NgForm } from '@angular/forms';
import { Grade, LoanRepaymentLog, LoanType } from 'app/_services/service-proxies';
import { CommonServiceProxy, LoanTypeDTO, AddUpdateLoanTypeServiceProxy, IdNameObj, PostLoanDto, LoadRepaymentScheduleServiceProxy, SimulatePaymentServiceProxy, GetLoanSummaryServiceProxy, PostFullRepaymentServiceProxy, FetchLoanTypeByIdServiceProxy } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';


enum TABLE_ACTION {
  VIEW = '1',
  EDIT = '3'
}
@Component({
  selector: 'ngx-loan-type',
  templateUrl: './loan-type.component.html',
  styleUrls: ['./loan-type.component.scss']
})
export class LoanTypeComponent implements OnInit {

  loanTypesTable: TableColumn [] = [
    {name: 'code', title: 'Code'},
    {name: 'name', title: 'Type Name'},
    {name: 'minTenor', title: 'Department'},
    {name: 'maxTenor', title: 'Unit'},
    {name: 'interestRate', title: 'Interest Rate'},
    {name: 'eligibleGrades', title: 'Eligible Grades'},
  ];

  tableActions: TableAction[] = [
    {name: TABLE_ACTION.VIEW, label: 'View'},
    {name: TABLE_ACTION.EDIT, label: 'Edit'},

  ]

  loanType: NgForm;
  dataCounter: number = 0;
  loanTypeModel: LoanTypeDTO = new LoanTypeDTO();
  allGrades: Grade [] = [];
  isGuarantor:boolean = false;
  isActiveState:boolean = true;
  allRepaymentSchedule: LoanRepaymentLog [] = [];
  simulateData: LoanRepaymentLog [] = [];
  loanId: number = 0;
  loanSummary: IdNameObj [] = [];
  loanData: PostLoanDto = new PostLoanDto().clone();
  allloanTypes: LoanType [] = [];

  constructor(private commonService: CommonServiceProxy, private alertMe: AlertserviceService, private repaymentService: LoadRepaymentScheduleServiceProxy,
    private updateLoanService: AddUpdateLoanTypeServiceProxy, private simulateService: SimulatePaymentServiceProxy,
    private summaryService: GetLoanSummaryServiceProxy, private fullpaymentService: PostFullRepaymentServiceProxy,
    private loanTypeService: FetchLoanTypeByIdServiceProxy,) { }

  ngOnInit(): void {
    this.getGrades();
    this.fetchRepaymentSchedule();
    this.fetchRepaymentSchedule();
    this.getLoanTypes();
  }

  async createLoanType(){
    const data = await this.updateLoanService.addUpdateLoanType(this.loanTypeModel).toPromise();
    if(!data.hasError && data.result.isSuccessful){
      this.alertMe.openModalAlert('Success', 'Loan Type has been created!', 'Dismiss');
      this.loanType.resetForm()
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

  async postFullPayment(){
    const data = await this.fullpaymentService.postFullRepayment(this.loanData).toPromise();
    if(!data.hasError){
      this.alertMe.openModalAlert('Success', 'Repayment Posted!', 'Dismiss')
    }
  }

  async getLoanTypes(){
    const data = await this.loanTypeService.fetchLoanTypeById(1,1).toPromise();
    if(!data.hasError){
      this.allloanTypes = data.result;
      this.dataCounter = data.totalRecord;
      console.log(this.dataCounter)
    }
  }


  toggleGuarantor(event){
    this.isGuarantor = event
  }


}
