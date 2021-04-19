import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  PostServiceProxy, MessageOut, OnboardingPersonalDTO,
  OnboardingWorkDTO, CommonServiceProxy, DropdownValue, StateIListApiResult, State, Institution, IDTextViewModel, OnboardingBankDTO

} from '../../../_services/service-proxies';

import { AlertserviceService } from 'app/_services/alertservice.service';
import { DataServiceProxy } from '../../../_services/service-proxies'
import { from } from 'rxjs';

@Component({
  selector: 'ngx-employeepersonalinformation',
  templateUrl: './employeepersonalinformation.component.html',
  styleUrls: ['./employeepersonalinformation.component.scss']
})
export class EmployeepersonalinformationComponent implements OnInit {
  submitbtnPressed: boolean = false
  title: string = 'Employee Profile';
  selectedCase: string = 'personal_Info';
  selectedPanel: any = { title: 'personal_Info', label: 'Personal Information', status: 'Active' };
  hiringChecklist = [
    { title: 'personal_Info', label: 'Personal Information', status: 'Active' },
    { title: 'work_Info', label: 'Work Information', status: 'Inactive' },
    { title: 'payment_Info', label: 'Payment', status: 'Inactive' },
    { title: 'medical_Info', label: 'Medical Disclosure', status: 'Inactive' },
    { title: 'tax_Info', label: 'Tax', status: 'Inactive' },
    { title: 'document_Info', label: 'Documents', status: 'Inactive' },

  ];
  AdminForm: FormGroup
  UserData = new OnboardingPersonalDTO().clone();
  Gender: DropdownValue[] = [];
  Marital: DropdownValue[] = [];
  Institution: Institution[] = []
  BankName: DropdownValue[] = [];
  BankType: IDTextViewModel[] = [];
  paymentData = new OnboardingBankDTO().clone()


  constructor(private DataService: DataServiceProxy, private common: CommonServiceProxy, private PostService: PostServiceProxy,
    private alertservice: AlertserviceService) { }
  async getGender() {
    const data = await this.DataService.getDropDownValuesById(10).toPromise()
    if (!data.hasError) {
      console.log('gender', data.result)
      this.Gender = data.result;
      this.Gender[0].option_text
    }
  }
  async getMaritalStatus() {
    const data = await this.DataService.getDropDownValuesById(4).toPromise();
    if (!data.hasError) {
      console.log('gender', data.result)
      this.Marital = data.result;
      this.Gender[0].option_text
    }
  }

  async getBank() {
    const data = await this.DataService.getDropDownValuesById(3).toPromise();

    if (!data.hasError) {
      console.log('gender', data.result)
      this.BankName = data.result;
      console.log('bankname',this.BankName)
      // this.Gender[0].option_text
    }
  }
  async getAccountType() {
    const data = await this.DataService.getAccountTypes().toPromise()
    if (!data.hasError) {
      console.log('gender', data.result)
      this.BankType = data.result;
      // this.Gender[0].option_text
    }
  }
  async getInstitution() {
    const data = await this.common.getInstitutions().toPromise()
    if (!data.hasError) {
      this.Institution = data.result
      this.Institution[0].name
    }
  }

  get validated() {
    if (this.UserData.dateOfBirth) return true;
    return false
  }

  get validatedata() {
    if (this.UserData.dateofCompletion) return true;
    return false
  }

  get formvalidateb () {

    if (this.UserData.firstName && this.UserData.lastName && this.UserData.phoneNumber && this.UserData.dateOfBirth
      && this.UserData.martialStatusId && this.UserData.genderId && this.UserData.residentialAddress && this.UserData.fieldOfStudy
      && this.UserData.institutionId && this.UserData.nextOfKinFullName && this.UserData.nextofKinAddress && this.UserData.dateofCompletion
      && this.UserData.degree) return true;
    return false;
  }

  get formval () {

    if (this.paymentData.accountNumber && this.paymentData.accountName && this.paymentData.accountTypeId && this.paymentData.bankNameId) return true;
    return false;
  }

  async onSubmit() {
    alert('hello')

    this.submitbtnPressed = true
    const data = await this.PostService.addUpdateOnboardingPersonnalData(this.UserData).toPromise()
    if (!data.hasError) {
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.SUCCESS, data.message, 'OK');

    } else {
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.FAILED, data.message, 'OK')
    }
  }
  selectPanel(hiringlist, i) {
    this.selectedPanel = hiringlist;

    this.hiringChecklist.forEach(value => {
      value.status = 'Inactive';
    });
    this.hiringChecklist[i].status = 'Active';
    this.selectedCase = this.hiringChecklist[i].title;
  }

   async Submit(){
   
    this.submitbtnPressed = true
    console.log('paymentdata',this.paymentData)
  const data= await  this.PostService.addUpdateOnboardingPaymentData(this.paymentData).toPromise();
  if (!data.hasError) {
    this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.SUCCESS, data.message, 'OK');

  } else {
    this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.FAILED, data.message, 'OK')
  }
  }
  ngOnInit(): void {
    this.getGender();
    this.getMaritalStatus();
    this.getInstitution();
    this.getBank();
    this.getAccountType()
  }

}
