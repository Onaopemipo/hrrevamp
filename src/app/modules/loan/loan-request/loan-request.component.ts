import { NgForm } from '@angular/forms';
import { AlertserviceService } from './../../../_services/alertservice.service';
import { TableColumn } from './../../../components/tablecomponent/models';
import { LoanRequestDTO, AddUpdateLoanTypeServiceProxy, NewLoanRequestDTO, IdNameObj, UpdateLoadRequestDTO, GetLoanRequestsServiceProxy, GetLoanSummaryServiceProxy, UpdateLoanRequestServiceProxy, FetchLoanTypeByIdServiceProxy, LoanType } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-loan-request',
  templateUrl: './loan-request.component.html',
  styleUrls: ['./loan-request.component.scss']
})
export class LoanRequestComponent implements OnInit {

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
    {name: 'sn', title: 'SN'},
    {name: 'refNo', title: 'Ref No.'},
    {name: 'employeeId', title: 'Staff No.'},
    {name: 'employeeName', title: 'Employee Name'},
    {name: ' loanAmount', title: 'Loan Amount'},
    {name: ' amountRepaid', title: 'Amount Repaid'},
    {name: ' status', title: 'Status'},

  ];

  allLoansData: LoanRequestDTO [] = [];
  loanSummary: IdNameObj [] = [];
  updateLoanPayment: UpdateLoadRequestDTO = new UpdateLoadRequestDTO;
  viewLoanModal: boolean = false;
  loanForm: NgForm;
  allLoanTypes: LoanType [] = [];


  constructor(private alertMe: AlertserviceService, private loanService: AddUpdateLoanTypeServiceProxy,
     private getLoans: GetLoanRequestsServiceProxy, private loanSummaryService: GetLoanSummaryServiceProxy,
     private updateService: UpdateLoanRequestServiceProxy, private loanType: FetchLoanTypeByIdServiceProxy) { }

  ngOnInit(): void {
    this.getLoanTypes();
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
    this.alertMe.openModalAlert('Success', 'Request Created', 'Dismiss');
    this.loanForm.resetForm();
  }
  else{
    console.log('Failure', data.message);
  }
  }

  async getAllLoans(){
    const data = await this.getLoans.getLoanRequests(1,1,null,null,1,1,'',1,1).toPromise();
    if(!data.hasError){
      this.allLoansData = data.result;
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
    const data = await this.loanType.fetchLoanTypeById(1,1).toPromise();
    if(!data.hasError){
      this.allLoanTypes = data.result;
      console.log('Here are the types', this.allLoanTypes)
    }
  }

  showModal(){
    this.viewLoanModal = !this.viewLoanModal;
  }
}
