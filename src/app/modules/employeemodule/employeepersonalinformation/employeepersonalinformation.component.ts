import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  PostServiceProxy, MessageOut, OnboardingPersonalDTO,
  OnboardingWorkDTO, CommonServiceProxy, DropdownValue, StateIListApiResult, State,
  OnboardingMedicalDisclosureDTO, Institution, IDTextViewModel, OnboardingBankDTO, Country, OnboardingTaxDTO, Position

} from '../../../_services/service-proxies';

import { AlertserviceService } from 'app/_services/alertservice.service';
import { DataServiceProxy } from '../../../_services/service-proxies'
import { from } from 'rxjs';
import { FlowDirective, Transfer } from '@flowjs/ngx-flow';

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
  anyPreInjury: boolean = false
  UserData = new OnboardingPersonalDTO().clone();
  Gender: DropdownValue[] = [];
  Marital: DropdownValue[] = [];
  Institution: Institution[] = [];
  BankName: DropdownValue[] = [];
  BankType: IDTextViewModel[] = [];
  paymentData = new OnboardingBankDTO().clone();
  medicalData = new OnboardingMedicalDisclosureDTO().clone();
  Religion: DropdownValue[] = [];
  taxData = new OnboardingTaxDTO().clone();
  workData = new OnboardingWorkDTO().clone();
  countries: Country[] = []
  Designation: Position[] = [];
  allDepartment: DropdownValue[] = [];


  constructor(private DataService: DataServiceProxy, private common: CommonServiceProxy, private PostService: PostServiceProxy,
    private alertservice: AlertserviceService) { }
  async getGender() {
    const data = await this.DataService.getDropDownValuesById(10).toPromise()
    if (!data.hasError) {

      this.Gender = data.result;

    }
  }


  async proceedtoofferLetter() {
    // this.subtitle = 'Offer Letter';
    this.selectedPanel = 'offerletterPanel';
    this.submitbtnPressed = true
    console.log('workdata', this.workData)
    const data = await this.PostService.addUpdateOnboardingWorkData(this.workData).toPromise()
    if (!data.hasError) {
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.SUCCESS, data.message, 'OK');
      this.submitbtnPressed = false

    }

    else {
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.FAILED, data.message, 'OK')
    }
  }

  async getreligion() {
    const data = await this.DataService.getDropDownValuesById(8).toPromise()
    if (!data.hasError) {

      this.Religion = data.result;

      this.Gender[0].option_text
    }
  }

  async getCountry() {
    const data = await this.DataService.getCountries().toPromise()
    if (!data.hasError) {

      this.countries = data.result;
      console.log('countries', this.countries)
      this.Gender[0].option_text
    }
  }

  async getMaritalStatus() {
    const data = await this.DataService.getDropDownValuesById(4).toPromise();
    if (!data.hasError) {
      this.Marital = data.result;

    }
  }

  async getBank() {
    const data = await this.DataService.getDropDownValuesById(3).toPromise();

    if (!data.hasError) {
      console.log('gender', data.result)
      this.BankName = data.result;
      // console.log('bankname',this.BankName)
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

    }
  }

  async getDepartment() {
    const data = await this.DataService.getDropDownValuesById(2).toPromise()
    if (!data.hasError) {

      this.allDepartment = data.result;
      this.allDepartment[0].option_text
    }
  }

  async getDesignation() {
    const data = await this.common.getPosition().toPromise()
    if (!data.hasError) {
      this.Designation = data.result

    }
  }

  async SubmitMedicalData() {
    this.submitbtnPressed = true
    console.log('userdata', this.medicalData)

    this.submitbtnPressed = true
    const data = await this.PostService.addUpdateOnboardingMedicalDisclosureData(this.medicalData).toPromise()
    if (!data.hasError) {
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.SUCCESS, data.message, 'OK');
      this.submitbtnPressed = false

    } else {
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.FAILED, data.message, 'OK')
    }

  }

  SubmitMedical() {
    alert('hello medical')
    

  }

  get validated() {
    if (this.UserData.dateOfBirth) return true;
    return false
  }
  get val() {
    if (this.taxData.passportExpiryDate) return true; return false
  }

  get vali() {
    if (this.taxData.visaExpiryDate) return true; return false
  }
  get validatedata() {
    if (this.UserData.dateofCompletion) return true;
    return false
  }
  // Personal info validation
  get formvalidate() {

    if (this.UserData.firstName && this.UserData.lastName && this.UserData.phoneNumber && this.UserData.dateOfBirth
      && this.UserData.martialStatusId && this.UserData.genderId && this.UserData.residentialAddress && this.UserData.fieldOfStudy
      && this.UserData.institutionId && this.UserData.nextOfKinFullName && this.UserData.nextofKinAddress && this.UserData.dateofCompletion && this.UserData.religionId
      && this.UserData.defaultMobile
      && this.UserData.degree) return true;
    return false;
  }

  //VALIDATE THE  WORK DATA
  get formvalidation() {
    if (this.workData.hireDate && this.workData.dateofJoining && this.workData.salaryPerAnnum && this.workData.desginationId && this.workData.employeeTypeId
      && this.workData.departmentId && this.workData.reportingManagerId && this.workData.workEmail && this.workData.location) return true;
    return false
  }


  get validdating() {
    if (this.workData.hireDate) return true; return false
  }

  get validdate() {
    if (this.workData.dateofJoining) return true; return false
  }
  get formval() {

    if (this.paymentData.accountNumber && this.paymentData.accountName && this.paymentData.accountTypeId && this.paymentData.bankNameId) return true;
    return false;
  }

  async onSubmit() {
    console.log('userdata', this.UserData)

    this.submitbtnPressed = true
    const data = await this.PostService.addUpdateOnboardingPersonnalData(this.UserData).toPromise()
    if (!data.hasError) {
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.SUCCESS, data.message, 'OK');
      this.submitbtnPressed = false


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

  async Submit() {

    this.submitbtnPressed = true
    console.log('paymentdata', this.paymentData)
    const data = await this.PostService.addUpdateOnboardingPaymentData(this.paymentData).toPromise();
    if (!data.hasError) {
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.SUCCESS, data.message, 'OK');
      this.submitbtnPressed = false
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
    this.getreligion();
    this.getCountry();
    this.getDesignation()
    this.getDepartment();
  }

  valueChange(files: Transfer) {
    console.log('flow file', files.flowFile.file)

  }

}
