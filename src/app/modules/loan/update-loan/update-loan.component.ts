import { AlertserviceService } from './../../../_services/alertservice.service';
import { LoanRepaymentLog, UpdateLoadRequestDTO, UpdateLoanRequestServiceProxy } from './../../../_services/service-proxies';
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

  constructor(private updateService: UpdateLoanRequestServiceProxy, private alertMe: AlertserviceService) { }

  ngOnInit(): void {
  }


  async updateLoan(){
    const data = await this.updateService.updateLoanRequest(this.updateLoanPayment).toPromise();
    if(!data.hasError){
      this.alertMe.openModalAlert('Success', 'Loan Updated!', 'Dismiss')
    }
  }

  async makeRequest(){

  }

  async addGurantor(){

  }

  async addDocuments(){

  }

}
