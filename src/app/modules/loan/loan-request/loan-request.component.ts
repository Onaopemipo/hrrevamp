import { Router } from '@angular/router';
import { TableAction, TableActionEvent } from 'app/components/tablecomponent/models';
import { NgForm } from '@angular/forms';
import { AlertserviceService } from './../../../_services/alertservice.service';
import { TableColumn } from './../../../components/tablecomponent/models';
import { LoanRequestDTO, AddUpdateLoanTypeServiceProxy, NewLoanRequestDTO, IdNameObj, UpdateLoadRequestDTO, GetLoanRequestsServiceProxy, GetLoanSummaryServiceProxy, UpdateLoanRequestServiceProxy, FetchLoanTypeByIdServiceProxy, LoanType, GetInterestRateServiceProxy, InterestRate } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';

enum TABLE_ACTION {
  VIEW = '1',
  EDIT = '3'
}
@Component({
  selector: 'ngx-loan-request',
  templateUrl: './loan-request.component.html',
  styleUrls: ['./loan-request.component.scss']
})
export class LoanRequestComponent implements OnInit {

  tableActions: TableAction[] = [
    {name: TABLE_ACTION.VIEW, label: 'View'},
    {name: TABLE_ACTION.EDIT, label: 'Edit'},

  ]

  myHeader: string = 'You have no Loan Request';
  myDescription: string = 'Click to make a loan request';
  button: string = 'Click to request';
  pageNo: number = 1;

  loanModel: NewLoanRequestDTO = new NewLoanRequestDTO;
  loanRequest: NewLoanRequestDTO = new NewLoanRequestDTO;

  selectedCase: string = 'request';
  selectedPanel: any = { title: 'request', label: 'Loan Request', status: 'Active'};
  requestChecklist = [
    { title: 'request', label: 'Loan Request', status: 'Active' },
    { title: 'documents', label: 'Related Documents', status: 'Inactive' },
    { title: 'guarantor', label: 'Guarantor List', status: 'Inactive' }
  ];

  loanRequestTable: TableColumn [] = [
    {name: 'refNo', title: 'Ref No.'},
    {name: 'employeeNo', title: 'Employee No.'},
    {name: 'employeeName', title: 'Employee Name'},
    {name: ' amount', title: 'Loan Amount'},
    {name: ' requestedAmount', title: 'Requested Amount'},
    {name: ' loanTypeName', title: 'Loan Type'},

  ];

  tableActionClicked(event: TableActionEvent){
     if(event.name==TABLE_ACTION.VIEW){
      this.router.navigateByUrl('process-loan' + event.data.id)
       }

       else if(event.name==TABLE_ACTION.EDIT){
        this.router.navigateByUrl('update-loan' + event.data.id)
         }
  }

  allLoansData: LoanRequestDTO [] = [];
  loanSummary: IdNameObj [] = [];
  updateLoanPayment: UpdateLoadRequestDTO = new UpdateLoadRequestDTO;
  viewLoanModal: boolean = false;
  loanForm: NgForm;
  allLoanTypes: LoanType [] = [];
  allInterestRates: InterestRate [] = [];
  loansCounter: number = 1;
  loading: boolean = true;

  constructor(private alertMe: AlertserviceService, private loanService: AddUpdateLoanTypeServiceProxy,
     private getLoans: GetLoanRequestsServiceProxy, private loanSummaryService: GetLoanSummaryServiceProxy,
     private updateService: UpdateLoanRequestServiceProxy, private loanType: FetchLoanTypeByIdServiceProxy,
     private interestService: GetInterestRateServiceProxy, private router: Router) { }

  ngOnInit(): void {
    this.getLoanTypes();
    this.getInterestRate();

  }

  selectPanel(rolelist, i) {
    this.selectedPanel = rolelist;

    this.requestChecklist.forEach(value => {
      value.status = 'Inactive';
    });
    this.requestChecklist[i].status = 'Active';
    this.selectedCase = this.requestChecklist[i].title;

  }

  gotoNext(){
    this.pageNo = 2;
  }

  uploadFile(){


  }

  addGuarantor(){

  }

  async makeLoanRequest(){
  const data = await this.loanService.addUpdateLoanRequest(this.loanModel).toPromise();
  if(!data.hasError){
    this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Request Created', 'Dismiss');
    this.loanForm.resetForm();
  }
  else{
    console.log('Failure', data.message);
  }
  }

  async getAllLoans(){
    const data = await this.getLoans.getLoanRequests(1,1,'',10,1).toPromise();
    if(!data.hasError){
      this.allLoansData = data.result;
      this.loansCounter = data.totalRecord;
    }
  }

  async getLoanSummary(){
    const data = await this.loanSummaryService.getLoanSummary(0).toPromise();
    if(!data.hasError){
      this.loanSummary = data.result;
    }
  }

  async updateLoan(){
    const data = await this.updateService.updateLoanRequest(this.updateLoanPayment).toPromise();
    if(!data.hasError){
      this.alertMe.openModalAlert('Success', 'Loan Updated!', 'Dismiss')
    }
  }

  async getLoanTypes(){
    const data = await this.loanType.fetchLoanTypeById(0,1).toPromise();
    if(!data.hasError){
      this.allLoanTypes = data.result;
      console.log('Here are the types', this.allLoanTypes)
    }
  }

  async getInterestRate(){
    const data = await this.interestService.getInterestRate().toPromise();
    if(!data.hasError){
      this.allInterestRates = data.result;
    }
  }

  showModal(){
    this.viewLoanModal = !this.viewLoanModal;
  }
}
