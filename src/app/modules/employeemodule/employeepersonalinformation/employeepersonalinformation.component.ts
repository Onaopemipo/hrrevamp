import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  PostServiceProxy, MessageOut, OnboardingPersonalDTO,
  OnboardingWorkDTO, CommonServiceProxy, DropdownValue, StateIListApiResult, State,
  OnboardingMedicalDisclosureDTO, Institution, IDTextViewModel, FileParameter, OnboardingBankDTO, Country, OnboardingTaxDTO, Position, UploadDocumentServiceProxy

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
  Entity: IDTextViewModel[] = []
  tempRef:any=''
  entityId = 0;
  userId:number = 0
  isReadOnly?: boolean= false
  files:Transfer
  // itemId?:FileParameter[]=[];
  itemId:any= 0;
  OnboardingId: number = 1;
  id?: number = 1

  constructor(private DataService: DataServiceProxy, private common: CommonServiceProxy, private PostService: PostServiceProxy,
    private alertservice: AlertserviceService, private UploadDocumentService: UploadDocumentServiceProxy) { }
  async getGender() {
    const data = await this.DataService.getDropDownValuesById(10).toPromise()
    if (!data.hasError) {

      this.Gender = data.result;

    }
  }
  async getEntity() {
    const data = await this.DataService.docEntityTypes().toPromise()
    if (!data.hasError) {
      this.Entity = data.result
      console.log('doc', this.Entity)
    }
    else {
      return data.hasError[0]
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
  ngOnInit() {
    this.tempRef = `ref-${Math.ceil(Math.random() * 10e13)}`;
    this.getGender();
    this.getMaritalStatus();
    this.getInstitution();
    this.getBank();
    this.getAccountType()
    this.getreligion();
    this.getCountry();
    this.getDesignation()
    this.getDepartment();
    this.getEntity()
  }
  createdById?: number = 1;
  companyId?: number = 1;
  subId?: string = ''

  async Submitdoc() {
    alert('checking')
    this.submitbtnPressed = true
    const data = await this.PostService.addUpdateOnboardingDocummentData(this.OnboardingId, this.tempRef, this.userId, this.id, this.createdById, this.companyId, this.subId)
      .toPromise();
    if (!data.hasError) {
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.SUCCESS, data.message, 'OK');
      this.submitbtnPressed = false
    } else {
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.FAILED, data.message, 'OK')
    }
  }

  selectedFile(files: Transfer, title) {
    console.log('flow file', files.flowFile.file)
    if (this.Entity.length > 0) {
      let srchR = this.Entity.find(f => f.text == "EMPLOYEE_DOC");
      this.entityId = srchR.id;
    }
     const refNumber =  this.tempRef
    console.log('temp ref', this.tempRef)
    // this.files = files.flowFile.file
    this.UploadDocumentService.uploadDocs(this.userId,title,this.itemId,this.entityId,this.isReadOnly,refNumber,files.flowFile.file[0]).subscribe(data => {
      if (!data.hasError) {
        console.log('ref',this.tempRef)
        console.log('datarseee', data.result)
        if (!data.hasError) {
          this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.SUCCESS, data.message, 'OK');
          this.submitbtnPressed = false
        } else {
          this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.FAILED, data.message, 'OK')
        }
      }
    });
  }

}
