import { Component, OnInit } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import {
  PostServiceProxy, MessageOut, OnboardingPersonalDTO,Position,
  OnboardingWorkDTO, CommonServiceProxy, DropdownValue, StateIListApiResult, State,FetchEmployeesByName_IdServiceProxy,DropdownValueDTO
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
  UserData = new OnboardingPersonalDTO().clone();
  Marital: DropdownValue[] = [];
  Religion: DropdownValue[] = [];
  Designation: Position[] = [];
  nameId?:undefined
  Manager:DropdownValueDTO[]

  constructor(private sanitizer: DomSanitizer, private common: CommonServiceProxy, private PostService: PostServiceProxy, private alertservice: AlertserviceService,
    private DataService: DataServiceProxy,private FetchEmployeesByName_IdServiceProxy:FetchEmployeesByName_IdServiceProxy) { }
  async getGender() {
    const data = await this.DataService.getDropDownValuesById(10).toPromise()
    if (!data.hasError) {
      this.allGender = data.result;
      this.allGender[0].option_text
    }
  }

  async getManager() {
    const data = await this.FetchEmployeesByName_IdServiceProxy.getEmployeesByNameId(this.nameId).toPromise()
    if (!data.hasError) {
      this.Manager = data.result;
      console.log('manager',this.Manager)
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

  async getMaritalStatus() {
    const data = await this.DataService.getDropDownValuesById(4).toPromise();
    if (!data.hasError) {
      this.Marital = data.result;

    }
  }
  async getreligion() {
    const data = await this.DataService.getDropDownValuesById(8).toPromise()
    if (!data.hasError) {

      this.Religion = data.result;


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
    console.log('workdata', this.InformationData)
    const data = await this.PostService.addUpdateOnboardingPersonnalData(this.UserData).toPromise()
    if (!data.hasError) {
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.SUCCESS, data.message, 'OK');

      this.submitbtnPressed = false
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
    this.getMaritalStatus()
    this.getreligion()
    this.getDesignation()
    this.getManager()
  }

  async getDesignation() {
    const data = await this.common.getPosition().toPromise()
    if (!data.hasError) {
      this.Designation = data.result

    }
  }


  get formvalidation() {
    if (this.InformationData.firstName && this.InformationData.lastName && this.InformationData.personalEmail && this.InformationData.genderId && this.InformationData.residentialAddress) return true;
    return false
  }

  get formvalidated() {

    if (this.UserData.firstName && this.UserData.lastName && this.UserData.phoneNumber && this.UserData.dateOfBirth
      && this.UserData.martialStatusId && this.UserData.genderId && this.UserData.residentialAddress &&
      this.UserData.religionId
      && this.UserData.defaultMobile
      && this.UserData.degree && this.UserData.fieldOfStudy) return true;
    return false;
  }


  get formvalidate() {
    if (this.workData.hireDate && this.workData.dateofJoining && this.workData.salaryPerAnnum && this.workData.desginationId && this.workData.employeeTypeId
      && this.workData.departmentId && this.workData.reportingManagerId && this.workData.workEmail && this.workData.location && this.workData.onboardingId) return true;
    return false
  }

  get validdating() {
    if (this.workData.hireDate) return true; return false
  }
  // get formvalidate() {
  //   let resp: boolean = true;
  //   let nullable = [
  //     'id',
  //     'titleId',
  //     'companyId',
  //     'subID',
  //     'otherNames',
  //     'maritalStatusId',
  //     'defaultMobile',
  //     'religionId',
  //     'martialStatusId',
  //     'fieldOfStudy',
  //     'degree',
  //     'dateofCompletion',
  //     'cgpa',
  //     'institutionId',
  //     'nextOfKinFullName',
  //     'netofKinRelationship',
  //     'nextofKinPhoneNumber',
  //     'nextofKinAddress',
  //     'isActive',
  //     'isDeleted',
  //     'dateCreated',
  //     'createdById',
  //     'userId',
  //     'created_by'
  //   ]
  //   Object.entries(this.InformationData).map(([key, value], index) => {
  //     if ((value == "" || value == null || value == undefined) && nullable.indexOf(key) == -1) {
  //       resp = false;
  //     }
  //   })

  //   return resp;
  // }

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

  get validdate() {
    if (this.workData.dateofJoining) return true;
    return false;
  }


}
