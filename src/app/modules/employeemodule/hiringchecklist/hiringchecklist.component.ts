import { Component, OnInit } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import {
  PostServiceProxy, MessageOut, OnboardingPersonalDTO,
  OnboardingWorkDTO, CommonServiceProxy, DropdownValue, StateIListApiResult, State
} from '../../../_services/service-proxies';
import { FormGroup } from '@angular/forms';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { DataServiceProxy } from '../../../_services/service-proxies'
import { from } from 'rxjs';
@Component({
  selector: 'ngx-hiringchecklist',
  templateUrl: './hiringchecklist.component.html',
  styleUrls: ['./hiringchecklist.component.scss']
})
export class HiringchecklistComponent implements OnInit {
  title: string = 'Employee Onboarding';
  subtitle: string = 'Personal Information';
  selectedPanel: string = 'personalInfoPanel';
  showModulesModal = false;
  modalPosition = 'Center';
  messageBody: string = '';
  viewmessageBody: string = '';
  InformationData = new OnboardingPersonalDTO().clone();
  workData = new OnboardingWorkDTO().clone()
  onBoardingForm: FormGroup
  submitbtnPressed: boolean = false;
  allGender: DropdownValue[] = [];
  allState: State[] = []
  allDepartment: DropdownValue[] = [];


  constructor(private sanitizer: DomSanitizer, private common: CommonServiceProxy, private PostService: PostServiceProxy, private alertservice: AlertserviceService,
    private DataService: DataServiceProxy) { }
  async getGender() {
    const data = await this.DataService.getDropDownValuesById(10).toPromise()
    if (!data.hasError) {

      this.allGender = data.result;
      this.allGender[0].option_text
    }
  }

  async getDepartment() {
    const data = await this.DataService.getDropDownValuesById(2).toPromise()
    if (!data.hasError) {

      this.allDepartment = data.result;
      this.allDepartment[0].option_text
    }
  }

  async GetStates() {
    const data = await this.DataService.getStates().toPromise()
    if (!data.hasError) {
      this.allState = data.result
    }

  }


  get sanitizewysiwyg() {
    this.viewmessageBody = this.sanitizer.sanitize(1, this.messageBody);

    return this.viewmessageBody;
  }
  proceedtopersonalInfo() {
    this.subtitle = 'Personal Information';
    this.selectedPanel = 'personalInfoPanel';
  }
  async proceedtoworkInfo() {
    this.subtitle = 'Work Information';
    this.selectedPanel = 'workInfoPanel';
    this.submitbtnPressed = true
    const data = await this.PostService.addUpdateOnboardingPersonnalData(this.InformationData).toPromise()
    if (!data.hasError) {
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.SUCCESS, data.message, 'OK');

    } else {
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.FAILED, data.message, 'OK')
    }
  }


  async proceedtoofferLetter() {
    this.subtitle = 'Offer Letter';
    this.selectedPanel = 'offerletterPanel';
    this.submitbtnPressed = true
    console.log('workdata', this.workData)
    const data = await this.PostService.addUpdateOnboardingWorkData(this.workData).toPromise()
    if (!data.hasError) {
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.SUCCESS, data.message, 'OK');

    }

    else {
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.FAILED, data.message, 'OK')
    }
  }

  gotoPanel(paneltitle, wizardtitle) {
    this.subtitle = wizardtitle;
    this.selectedPanel = paneltitle;
  }
  ngOnInit(): void {
    this.getGender()
    this.GetStates()
    this.getDepartment()
  }

  get formvalidation(){
    if(this.workData.hireDate && this.workData.dateofJoining && this.workData.salaryPerAnnum && this.workData.desginationId && this.workData.employeeTypeId
      && this.workData.departmentId && this.workData.reportingManagerId && this.workData.workEmail && this.workData.location) return true; 
      return false
  }

  get validdating(){
    if(this.workData.hireDate) return true ; return false
  }
  get formvalidate() {
    let resp: boolean = true;
    let nullable = [
      'id',
      'titleId',
      'companyId',
      'subID',
      'otherNames',
      'maritalStatusId',
      'defaultMobile',
      'religionId',
      'martialStatusId',
      'fieldOfStudy',
      'degree',
      'dateofCompletion',
      'cgpa',
      'institutionId',
      'nextOfKinFullName',
      'netofKinRelationship',
      'nextofKinPhoneNumber',
      'nextofKinAddress',
      'isActive',
      'isDeleted',
      'dateCreated',
      'createdById',
      'userId',
      'created_by'
    ]
    Object.entries(this.InformationData).map(([key, value], index) => {
      if ((value == "" || value == null || value == undefined) && nullable.indexOf(key) == -1) {
        resp = false;
      }
    })

    return resp;
  }

  get formvalid() {
    let resp: boolean = true;
    let nullable = [
      'id',
      'titleId',
      'companyId',
      'subID',
      'otherNames',
      'maritalStatusId',
      'defaultMobile',
      'religionId',
      'martialStatusId',
      'fieldOfStudy',
      'degree',
      'dateofCompletion',
      'cgpa',
      'institutionId',
      'nextOfKinFullName',
      'netofKinRelationship',
      'nextofKinPhoneNumber',
      'nextofKinAddress',
      'isActive',
      'isDeleted',
      'dateCreated',
      'createdById',
      'userId',
      'created_by'
    ]
    Object.entries(this.InformationData).map(([key, value], index) => {
      if ((value == "" || value == null || value == undefined) && nullable.indexOf(key) == -1) {
        resp = false;
      }
    })

    return resp;
  }

  get validatedate() {
    if (this.InformationData.dateOfBirth) return true;
    return false;
  }

  get  validdate() {
    if (this.workData.dateofJoining) return true;
    return false;
  }
 

}
