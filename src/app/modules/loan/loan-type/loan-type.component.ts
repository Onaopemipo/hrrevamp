import { Router } from '@angular/router';
import { TableColumn, TableAction, TableActionEvent } from './../../../components/tablecomponent/models';
import { AlertserviceService } from './../../../_services/alertservice.service';
import { NgForm } from '@angular/forms';
import { Grade, InterestRate, LoanRepaymentLog, LoanType, DataServiceProxy, IDTextViewModel, DeleteLoanTypeServiceProxy } from 'app/_services/service-proxies';
import { CommonServiceProxy, LoanTypeDTO, AddUpdateLoanTypeServiceProxy, IdNameObj, PostLoanDto, LoadRepaymentScheduleServiceProxy,
  SimulatePaymentServiceProxy, GetLoanSummaryServiceProxy, PostFullRepaymentServiceProxy,
  GetLoanTypesByCriteriaServiceProxy, GetInterestRateServiceProxy, GetLoanTypesServiceProxy, IDTextViewModelIListApiResult } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';


enum TABLE_ACTION {
  VIEW = '1',
  DELETE = '2',
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
    {name: 'interestTypeName', title: 'Interest Type'},
    {name: 'requiredNoOfGuarantors', title: 'Guarantor(s)'},
    {name: 'description', title: 'Description'},
  ];

  eligibleGrades = [{key: 'key1', value: 'Opt 1'},
                     {key: 'key2', value: 'Opt 2'},
                     {key: 'key3', value: 'Opt 3'},
                     {key: 'key4', value: 'Opt 4'},
                     {key: 'key5', value: 'Opt 5'},
                     {key: 'key6', value: 'Opt 6'},
                     {key: 'key7', value: 'Opt 7'}];


  tableActions: TableAction[] = [
    {name: TABLE_ACTION.VIEW, label: 'View'},
    {name: TABLE_ACTION.EDIT, label: 'Edit'},
    {name: TABLE_ACTION.DELETE, label: 'Delete'},

  ]

  tableActionClicked(event: TableActionEvent){
     if(event.name==TABLE_ACTION.VIEW){
      this.router.navigateByUrl('/' + event.data.id)
       }

       else if(event.name==TABLE_ACTION.EDIT){
        this.router.navigateByUrl('/' + event.data.id)
         }

        else if(event.name == TABLE_ACTION.DELETE){
          this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.CONFIRM, 'Do you want to delete this?', 'Yes').subscribe(dataAction => {
            if(dataAction == 'closed'){
              this.deleteService.deleteLoanType(event.data.id).subscribe(myData => {
                if(!myData.hasError && myData.result.isSuccessful == true){
                  this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Loan Request has been deleted','Success').subscribe(delData =>{
                    if(delData) this.router.navigateByUrl('/loan/loan-type')
                  })
                }
              })
            }
          })
        }
  }

  options = [
    { value: 'all', label: 'All Grades' },
    { value: 'selected', label: 'Selected Grades' },
  ];
  option;

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
  allLoanTypes: LoanTypeDTO [] = [];
  createType: boolean = false;
  allInterestRates: IDTextViewModel [] = [];
  eligibilityStatus: IDTextViewModel [] = [];

  constructor(private commonService: CommonServiceProxy, private alertMe: AlertserviceService,
    private repaymentService: LoadRepaymentScheduleServiceProxy, private updateLoanService: AddUpdateLoanTypeServiceProxy,
    private simulateService: SimulatePaymentServiceProxy, private deleteService: DeleteLoanTypeServiceProxy,
    private summaryService: GetLoanSummaryServiceProxy, private fullpaymentService: PostFullRepaymentServiceProxy,
    private loanTypeService: GetLoanTypesByCriteriaServiceProxy, private interestService: GetInterestRateServiceProxy,
    private dataService: DataServiceProxy, private router: Router) { }

  ngOnInit(): void {
    this.getGrades();
    this.fetchRepaymentSchedule();
    this.fetchRepaymentSchedule();
    this.fetchAllLoanTypes();
    this.getInterestRate();
    this.fetchEligibilityStatus();
  }


  createNewType(){
    this.createType = true;
  }

  loanEligibility(e){
    // alert(e.target.value);
    console.log(e);
  }

  async fetchEligibilityStatus(){
    const data = await this.dataService.loanEligibleStatus().toPromise();
    if(!data.hasError){
      this.eligibilityStatus = data.result;
    }
  }

  async createLoanType(){
    const data = await this.updateLoanService.addUpdateLoanType(this.loanTypeModel).toPromise();
    console.log(data)
    if(!data.hasError && data.result.isSuccessful){
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Loan Type has been created!', 'Dismiss').subscribe(dataAction => {
        this.router.navigateByUrl('/loan/loan-type');
        this.fetchAllLoanTypes();
        this.loanTypeModel = new LoanTypeDTO().clone();
        this.createType = false;
      });

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
    const data = await this.simulateService.simulatePayment(0,0,0,0,null).toPromise();
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

  async fetchAllLoanTypes(){
    const data = await this.loanTypeService.getLoanTypesByCriteria('','','',0,0,0,0,1,10).toPromise();
    if(!data.hasError){
      this.allLoanTypes = data.result;
      this.dataCounter = data.totalRecord;
      console.log('All Loan Types:', this.allLoanTypes);
      this.loading = false;
  }

}


  toggleGuarantor(event){
    this.isGuarantor = event
  }


}
