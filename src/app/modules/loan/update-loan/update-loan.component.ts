import { AlertserviceService } from './../../../_services/alertservice.service';
import { LoanRepaymentLog, UpdateLoadRequestDTO, UpdateLoanRequestServiceProxy, LoanRequestDTOs, GetLoanRequestServiceProxy, ManageLoanRequestDTO } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';

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


  constructor(private updateService: UpdateLoanRequestServiceProxy, private alertMe: AlertserviceService,
    private loanService: GetLoanRequestServiceProxy) { }

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

}
