import { Router, ActivatedRoute } from '@angular/router';
import { TableAction, TableActionEvent } from 'app/components/tablecomponent/models';
import { NgForm } from '@angular/forms';
import { AlertserviceService } from './../../../_services/alertservice.service';
import { TableColumn } from './../../../components/tablecomponent/models';
import { LoanRequestDTOs, AddUpdateLoanTypeServiceProxy, IdNameObj, UpdateLoadRequestDTO, GetLoanRequestsServiceProxy, GetLoanSummaryServiceProxy, UpdateLoanRequestServiceProxy, FetchLoanTypeByIdServiceProxy, LoanType, GetInterestRateServiceProxy, InterestRate, GetLoanTypesServiceProxy, LoanTypeDTO, IVwUserObj, ManageLoanRequestDTO, AddUpdateLoanRequestServiceProxy, GetLoanRequestServiceProxy } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/_services/authentication.service';

enum TABLE_ACTION {
  VIEW = '1',
  DELETE = '2',
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
    {name: TABLE_ACTION.DELETE, label: 'Delete'},

  ]

  myHeader: string = 'You have no Loan Request';
  myDescription: string = 'Click to make a loan request';
  button: string = 'Click to request';
  pageNo: number = 1;

  tempRef: any = '';
  toggleNgModel: boolean = false;

  allowmultipleselection: boolean = false;
  selectionHeader: string = "Select Employee";
  addbtnText: string = "Add Employee";

  loanModel: ManageLoanRequestDTO = new ManageLoanRequestDTO().clone();
  loanRequest: any;

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

         else if(event.name==TABLE_ACTION.DELETE){
          this.router.navigateByUrl('update-loan' + event.data.id)
           }
  }

  allLoansData: LoanRequestDTOs [] = [];
  singleLoanData: LoanRequestDTOs = new LoanRequestDTOs;
  loanSummary: IdNameObj [] = [];
  updateLoanPayment: UpdateLoadRequestDTO = new UpdateLoadRequestDTO;
  viewLoanModal: boolean = false;
  loanForm: NgForm;
  allLoanTypes: LoanTypeDTO [] = [];
  allInterestRates: InterestRate [] = [];
  loansCounter: number = 1;
  loading: boolean = true;
  allloanTypes: LoanType [] = [];
  dataCounter: number = 0;
  user: IVwUserObj;
  loanId: number = 0;

  constructor(private alertMe: AlertserviceService, private loanService: GetLoanRequestServiceProxy,
     private getLoans: GetLoanRequestsServiceProxy, private loanSummaryService: GetLoanSummaryServiceProxy,
     private updateService: UpdateLoanRequestServiceProxy, private loanType: FetchLoanTypeByIdServiceProxy,
     private interestService: GetInterestRateServiceProxy, public authServ: AuthenticationService,
     private router: Router, private loanTypeService: GetLoanTypesServiceProxy, private route: ActivatedRoute,
     private loanRequestService: AddUpdateLoanRequestServiceProxy) { }

  ngOnInit(): void {
    this.tempRef = `ref-${Math.ceil(Math.random() * 10e13)}`;
    this.getInterestRate();
    this.fetchAllLoanTypes();
    this.getAllLoans();
    this.getLoggedInUser();
    this.loanId = Number(this.route.snapshot.paramMap.get("id"));

  }

  toggler(e){
    this.toggleNgModel = e;
    if(this.toggleNgModel === false){
        this.loanModel.employeeNo = String(this.user.employee_id);
        this.loanModel.employeeName = this.user.full_name;

    }
    else {
      return;
    }
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
    this.loanModel.tempRef = this.tempRef;
  }


  async makeLoanRequest(){
  this.loanModel.loggedForEmployeeId = this.user.employee_id;
  console.log(this.loanModel)
  const data = await this.loanRequestService.addUpdateLoanRequest(this.loanModel).toPromise();
  if(!data.hasError){
    this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Request Created', 'Dismiss');
    this.loanForm.reset();
    this.loanModel = new ManageLoanRequestDTO();
  }
  else{
    this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, 'Failure', 'Dismiss')
  }
  }

  async fetchSingleLoanRequest(){
    const data = await this.loanService.getLoanRequest(this.loanId).toPromise();
    if(!data.hasError){
      this.singleLoanData = data.result;
    }
  }

  async getAllLoans(){
    const data = await this.getLoans.getLoanRequests(null,null,1,'',10,1).toPromise();
    console.log('My data',data);
    if(!data.hasError){
      this.allLoansData = data.result;
      this.loansCounter = data.totalRecord;
      console.log('my counter',  this.loansCounter )
      if(this.loansCounter < 1) this.loading = false;

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

  // async getLoanTypes(){
  //   const data = await this.loanType.fetchLoanTypeById(0,1).toPromise();
  //   if(!data.hasError){
  //     this.allLoanTypes = data.result;
  //     console.log('Here are the types', this.allLoanTypes)
  //   }
  // }

  async fetchAllLoanTypes(){
    const data = await this.loanTypeService.getLoanTypes().toPromise();
    if(!data.hasError){
      this.allloanTypes = data.result;
      this.dataCounter = data.totalRecord;
      console.log(this.dataCounter, this.allloanTypes)
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

  async getLoggedInUser(){
    this.authServ.getuser().then(async (users: IVwUserObj[])=> {
      if (users) {
        if (users.length > 0) {
          this.user = users[0];
          console.log('My user is here',this.user)
  }
  }
  })

  }

  getSelectedEmployee(event,selectType) {
     if(selectType == 'employee' && this.toggleNgModel == true){
      this.loanModel.employeeNo = event[0].employeeNumber;
      this.loanModel.employeeName = event[0].firstName +' '+ event[0].firstName;
     }
  }

  getGuarantors(event,selectType) {
    console.log(event)
     if(selectType == 'employee')this.loanModel.strGuarantorIds = event[0].employeeNumber;
     console.log(selectType, event)
  }

}
