import { IVwUserObj } from 'app/_services/service-proxies';
import { AlertserviceService } from './../../../_services/alertservice.service';
import { LoanRepaymentLog, UpdateLoadRequestDTO, UpdateLoanRequestServiceProxy, LoanRequestDTOs, GetLoanRequestServiceProxy, ManageLoanRequestDTO } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/_services/authentication.service';

@Component({
  selector: 'ngx-update-loan',
  templateUrl: './update-loan.component.html',
  styleUrls: ['./update-loan.component.scss']
})
export class UpdateLoanComponent implements OnInit {

  repaymentData: LoanRepaymentLog [] = [];
  simulationData: LoanRepaymentLog [] = [];
  updateLoanPayment: UpdateLoadRequestDTO = new UpdateLoadRequestDTO;
  singleLoanData: LoanRequestDTOs = new LoanRequestDTOs;
  loanId:number = 0;
  updateLoanData: ManageLoanRequestDTO = new ManageLoanRequestDTO();
  selectionHeader="";
  user: IVwUserObj;
  toggleNgModel: boolean = false;


  constructor(private updateService: UpdateLoanRequestServiceProxy, private alertMe: AlertserviceService,
    private loanService: GetLoanRequestServiceProxy, private authServ: AuthenticationService,) { }

  ngOnInit(): void {
  }


  async updateLoan(){
    const data = await this.updateService.updateLoanRequest(this.updateLoanPayment).toPromise();
    if(!data.hasError){
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Loan Updated!', 'Dismiss')
    }
  }

  async fetchSingleLoanRequest(){
    const data = await this.loanService.getLoanRequest(this.loanId).toPromise();
    if(!data.hasError){
      this.singleLoanData = data.result;
    }
  }

  async makeRequest(){

  }

  async addGurantor(){

  }

  async addDocuments(){

  }

  toggler(e){
    this.toggleNgModel = e;
    if(this.toggleNgModel === false){
        this.updateLoanData.employeeNo = String(this.user.employee_id);
        this.updateLoanData.employeeName = this.user.full_name;
        this.updateLoanData.loggedForEmployeeId = this.user.employee_id;
    }
    else {
      return;
    }
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
     this.updateLoanData.employeeNo = event[0].employeeNumber;
     this.updateLoanData.employeeName = event[0].firstName +' '+ event[0].firstName;
     this.updateLoanData.loggedForEmployeeId = event[0].id;
    }
 }
}
