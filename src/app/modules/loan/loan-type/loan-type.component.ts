import { Router } from '@angular/router';
import { TableColumn, TableAction, TableActionEvent } from './../../../components/tablecomponent/models';
import { AlertserviceService } from './../../../_services/alertservice.service';
import { NgForm } from '@angular/forms';
import { Grade, InterestRate, LoanRepaymentLog, LoanType, DataServiceProxy, IDTextViewModel } from 'app/_services/service-proxies';
import { CommonServiceProxy, LoanTypeDTO, AddUpdateLoanTypeServiceProxy, IdNameObj, PostLoanDto, LoadRepaymentScheduleServiceProxy, SimulatePaymentServiceProxy, GetLoanSummaryServiceProxy, PostFullRepaymentServiceProxy, FetchLoanTypeByIdServiceProxy, GetInterestRateServiceProxy, GetLoanTypesServiceProxy, IDTextViewModelIListApiResult } from './../../../_services/service-proxies';
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
    {name: 'ledgerNo', title: 'Ledger No'},
    {name: 'interestRate', title: 'Interest Rate'},
    {name: 'eligibleGrades', title: 'Eligible Grades'},
    {name: 'description', title: 'Description'},
  ];

  tableActions: TableAction[] = [
    {name: TABLE_ACTION.VIEW, label: 'View'},
    {name: TABLE_ACTION.EDIT, label: 'Edit'},

  ]

  tableActionClicked(event: TableActionEvent){
    // if(event.name==TABLE_ACTION.DELETE){
    //   this.showdeleteModal = true
    //   }
    //   if(event.name==TABLE_ACTION.EDIT){
    //     this.router.navigateByUrl('/payroll/editpayment')
    //   }
     if(event.name==TABLE_ACTION.VIEW){
      this.router.navigateByUrl('/career-succession/profiledetails/' + event.data.id)
       }

       else if(event.name==TABLE_ACTION.VIEW){
        this.router.navigateByUrl('/career-succession/profiledetails/' + event.data.id)
         }
  }

  loanType: NgForm;
  loading: boolean = true;
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
  allLoanTypes: LoanType [] = [];
  createType: boolean = false;
  allInterestRates: IDTextViewModel [] = [];

  constructor(private commonService: CommonServiceProxy, private alertMe: AlertserviceService, private repaymentService: LoadRepaymentScheduleServiceProxy,
    private updateLoanService: AddUpdateLoanTypeServiceProxy, private simulateService: SimulatePaymentServiceProxy,
    private summaryService: GetLoanSummaryServiceProxy, private fullpaymentService: PostFullRepaymentServiceProxy,
    private loanTypeService: GetLoanTypesServiceProxy,private interestService: GetInterestRateServiceProxy,
    private dataService: DataServiceProxy, private router: Router) { }

  ngOnInit(): void {
    this.getGrades();
    this.fetchRepaymentSchedule();
    this.fetchRepaymentSchedule();
    this.fetchAllLoanTypes();
    this.getInterestRate();
  }


  createNewType(){
    this.createType = true;
  }

  async createLoanType(){
    const data = await this.updateLoanService.addUpdateLoanType(this.loanTypeModel).toPromise();
    console.log(data)
    if(!data.hasError && data.result.isSuccessful){
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Loan Type has been created!', 'Dismiss');
      this.loanType.resetForm()
    }

    else {
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, 'Could not add Loan Type', 'Dismiss')
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

  async getInterestRate(){
    // const data = await this.interestService.getInterestRate().toPromise();
    const data = await this.dataService.interestTypes().toPromise();
    console.log('Here is my list', data.result);
    if(!data.hasError){
      this.allInterestRates = data.result;
      console.log(this.allInterestRates);
    }
  }

  async postFullPayment(){
    const data = await this.fullpaymentService.postFullRepayment(this.loanData).toPromise();
    if(!data.hasError){
      this.alertMe.openModalAlert('Success', 'Repayment Posted!', 'Dismiss')
    }
  }

  // async getLoanTypes(){
  //   const data = await this.loanTypeService.fetchLoanTypeById(1,1).toPromise();
  //   if(!data.hasError){
  //     this.allloanTypes = data.result;
  //     this.dataCounter = data.totalRecord;
  //     console.log(this.dataCounter, this.allloanTypes)
  //   }
  // }

  async fetchAllLoanTypes(){
    const data = await this.loanTypeService.getLoanTypes().toPromise();
    if(!data.hasError){
      this.allLoanTypes = data.result;
      this.dataCounter = data.totalRecord;
      console.log(this.allLoanTypes);
  }

}


  toggleGuarantor(event){
    this.isGuarantor = event
  }


}
