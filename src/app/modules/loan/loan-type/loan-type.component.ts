import { AlertserviceService } from './../../../_services/alertservice.service';
import { NgForm } from '@angular/forms';
import { Grade } from 'app/_services/service-proxies';
import { CommonServiceProxy, LoanTypeDTO, AddUpdateLoanTypeServiceProxy } from './../../../_services/service-proxies';
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

  constructor(private commonService: CommonServiceProxy, private alertMe: AlertserviceService, private loanService: AddUpdateLoanTypeServiceProxy) { }

  ngOnInit(): void {
    this.getGrades();
  }

  async createLoanType(){
    const data = await this.loanService.addUpdateLoanType(this.loanTypeModel).toPromise();
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


  toggleGuarantor(event){
    this.isGuarantor = event
  }

}
