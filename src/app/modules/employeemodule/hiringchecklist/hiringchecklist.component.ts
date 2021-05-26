import { Component, OnInit } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import {
  PostServiceProxy, MessageOut, OnboardingPersonalDTO,Position,Location,PrepareOfferLetterEmailServiceProxy,
  OnboardingWorkDTO, CommonServiceProxy, DropdownValue, StateIListApiResult, State,FetchEmployeesByName_IdServiceProxy,DropdownValueDTO, EmployeeOnboardingPersonalData, FetchEmployeeOnboardingDataDetailsServiceProxy, Institution, Course, IDTextViewModel, Qualification, PrepareOfferLetterDTO
} from '../../../_services/service-proxies';
import { FormGroup } from '@angular/forms';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { DataServiceProxy } from '../../../_services/service-proxies'
import { from } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'ngx-hiringchecklist',
  templateUrl: './hiringchecklist.component.html',
   styleUrls: ['./hiringchecklist.component.scss']
})
export class HiringchecklistComponent implements OnInit {
  allInstitution: Institution[] = [];
  allCourses: Course[] = [];
  alllocations: Location[] = [];
  allQulificationType: IDTextViewModel[] = [];
  allQualifications: Qualification[] = [];
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
  loading: boolean = false;
  totalItems = 0;
  onBoarding: EmployeeOnboardingPersonalData[] = []
  OnboardingId = 0;
  OfferLetterDTO = new PrepareOfferLetterDTO().clone();
  offerContent =  "\r\n\r\n<body>\r\n<p>Thursday, April 29, 2021]</p>\r\n<p>Re: Offer Letter</p>\r\n<p>Dear kunle,</p>\r\n<p>On behalf of Smartace (the &quot;Brightstar Integral Solution Limited&quot;), I am pleased to offer you employment with Smartace in the position of Active, starting on Tuesday, April 20, 2021. In that position, you will report to Tope Badmus.</p>\r\n<p>During your employment, you will be paid a base salary at the annual rate of #10,000.00. Your compensation will be paid in regular installments in accordance with the Company&rsquo;s regular payroll process, and subject to applicable tax and other withholdings. As an exempt employee, you will not be eligible for any overtime pay.This position is a full-time position and your regular salary will be pro-rated based on a None hour work week.</p>\r\n<p>Stock Options: Pursuant to the Company's Equity Incentive Plan (the &quot;Plan&quot;), you will be granted an option to purchase 0 shares of the Company's common stock at an exercise price equal to the fair market value of those shares on the date of grant. Your stock option will be subject to and governed by the terms and conditions of the Plan and the Company's standard form of stock option agreement, which you will be required to sign as a condition of your stock option grant. </p>\r\n<p>At-Will Employment: Your employment with the Company is &quot;at will,&quot; and thus you or Company may terminate our employment relationship at any time, with or without cause or advance notice. The Company reserves the right, in its sole discretion, to change your compensation and/or employee benefits at any time on a prospective basis.</p>\r\n<p>Additional Agreements: As a condition of your employment, you agree to execute any additional agreements required by the Company at the start of your employment. This includes any agreements that relate to your confidentiality or intellectual property assignment obligations to the Company. You further agree that at all times during your employment (and afterwards as applicable), you will be bound by, and will fully comply with, these additional agreements.</p>\r\n<p>Contingencies: This offer is contingent upon the successful completion of any background or reference checks desired by the Company. For purposes of federal immigration law, you will be required to provide to the Company documentary evidence of your identity and eligibility for employment in the United States. Such documentation must be provided to us within three business days following the start of your employment, or our employment relationship with you may be terminated.</p>\r\n<p>Additional Terms and Conditions of Offer: </p>\r\n<p>Entire Agreement: This employment agreement, along with the Confidentiality Agreement, sets forth the terms and conditions of your employment with the Company, and supersedes any prior representations or agreements concerning your employment with the Company, whether written or oral. You acknowledge and agree that you are not relying on any statements or representations concerning the Company or your employment with the Company except those made in this agreement. This employment agreement may not be modified or amended except by a written agreement signed by you and an authorized officer of the Company.</p>\r\n<p>This offer of employment will expire None at 4/21/2021 3:54:43 PM.</p>\r\n<p>kunle, we are excited by the prospect of you joining the Company.</p>\r\n<p>Sincerely,<br />\r\n  Brightstar Integral Solution Limited<br />\r\n</p>\r\n<p>By:<br />\r\n</p>\r\n<p><img src='https://blog.mailtrap.io/wp-content/uploads/2018/11/blog-illustration-email-embedding-images.png?w=640' /></p>\r\n<p>Name: Miracle</p>\r\n<p>Title: CEO</p>\r\n<p>************</p>\r\n<p>I hereby agree to and accept employment with the Company on the terms and conditions set forth in this offer letter.<br />\r\n</p>\r\n<p>Sherif Sorunke</p>\r\n<p>Dated:</p>\r\n</body>\r\n\r\n"
  activateWorkPanel = false;
  activateOfferPanel = false;
  constructor(private FetchEmployeeOnboardingDataDetailsServiceProxy: FetchEmployeeOnboardingDataDetailsServiceProxy,
    private sanitizer: DomSanitizer, private common: CommonServiceProxy, private PostService: PostServiceProxy, private alertservice: AlertserviceService,
    private DataService: DataServiceProxy, private FetchEmployeesByName_IdServiceProxy: FetchEmployeesByName_IdServiceProxy,
    private activatedroute: ActivatedRoute, private offerService: PrepareOfferLetterEmailServiceProxy,
    private router: Router, 

  ) { }
  async getGender() {
    const data = await this.DataService.getDropDownValuesById(12).toPromise()
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
    this.submitbtnPressed = true
  
    delete this.UserData.dateofCompletion
    console.log('workdata', this.UserData)
    const data = await this.PostService.addUpdateOnboardingPersonnalData(this.UserData).toPromise()
    if (!data.hasError) {
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.SUCCESS, data.message, 'OK');
      this.subtitle = 'Work Information';
      this.selectedPanel = 'workInfoPanel';
      this.activateWorkPanel = true;
      console.log(data);
      this.OnboardingId = data.result.retId;
      console.log( this.OnboardingId )
      this.submitbtnPressed = false
    } else {
      this.submitbtnPressed = false;
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.FAILED, data.message, 'OK')
    }
  }
  sendtoofferLetter() {
    this.router.navigate(['/employeemodule/allemployees'])
  }

  getOfferLetterTemplate(onboardingId) {
    this.offerService.applicantJobOfferEmail(onboardingId).subscribe(data => {
      if (!data.hasError) {
        this.OfferLetterDTO = data.result;
      
      }});
  }

  async proceedtoofferLetter() {
    this.subtitle = 'Offer Letter';
    this.selectedPanel = 'offerletterPanel';
    this.submitbtnPressed = true
    this.workData.onboardingId = this.OnboardingId;
    console.log('workdata', this.workData)
    const data = await this.PostService.addUpdateOnboardingWorkData(this.workData).toPromise()
    this.submitbtnPressed = false;
    if (!data.hasError) {
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.SUCCESS, data.message, 'OK');
      this.getOfferLetterTemplate(this.OnboardingId);
    }
    else {
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.FAILED, data.message, 'OK')
    }
  }

  gotoPanel(paneltitle, wizardtitle) {
    if (paneltitle == "workInfoPanel" && !this.OnboardingId) {
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.FAILED, "Please complete personal information", 'OK');
      return;
    }
    if (paneltitle == "offerletterPanel" && !this.OnboardingId) {
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.FAILED, "Please complete personal information and Work Information", 'OK');
      return;
    }
    this.subtitle = wizardtitle;
    this.selectedPanel = paneltitle;
  }
  getExistingDetails() {
    this.activatedroute.queryParams.subscribe(data => {
      if (data) {
        if (data.onboardingId) {
          this.OnboardingId = data.onboardingId;
          this.getAllEmployeeOnboarding(data.onboardingId);
          this.getOfferLetterTemplate(this.OnboardingId);
        }
      }
    })
  }
   getAllEmployeeOnboarding(onboardingId){
    this.loading= false
     this.FetchEmployeeOnboardingDataDetailsServiceProxy.fetchEmployeeOnboardingDataDetails(onboardingId, 0).subscribe((data:any) => {
       if (!data.hasError) {
         var pInfo = data.result[0].onboardingPersonalInfo;
        this.onBoarding = data.result;
         this.UserData = new OnboardingPersonalDTO(pInfo);
         this.UserData.dateOfBirth = pInfo.dateofBirth;
         this.UserData.phoneNumber = pInfo.phoneNumber;
         this.UserData.martialStatusId = pInfo.martialStatusId;
         this.UserData.fieldOfStudy = pInfo.fieldofStudy; 
         this.UserData.degree = pInfo.degree;      

        this.workData =  data.result[0].onboardingWorkInformation ? data.result[0].onboardingWorkInformation : new OnboardingWorkDTO().clone();
        this.totalItems = data.totalRecord      
  
      }
 })
    
  }
  async  getAllQualificationsType() {
    this.DataService.qualificationCategories().subscribe(data => {
      if(!data.hasError){
         this.allQulificationType = data.result;
      }
      else {
        console.log('There was an error')
      }
    })
  }
  async  getAllQualificationsCourses() {
    this.common.getCourses().subscribe(data => {
      if (!data.hasError) {
        this.allCourses = data.result;
      }else{}
      
    })
  }
  async  getAllInstitutions() {
    this.common.getInstitutions().subscribe(data => {
      if (!data.hasError) {
        this.allInstitution = data.result;
      }else{}
      
    })
  }
  getalllocations() {
    this.common.getLocations().subscribe(data => {
      if (!data.hasError) {
        this.alllocations = data.result;
      }else{}
      
    })
  }
  ngOnInit(): void {
    this.getExistingDetails();
    this.getGender()
    this.GetStates()
    this.getDepartment()
    this.getMaritalStatus()
    this.getreligion()
    this.getDesignation()
    this.getManager()
    this.getAllQualificationsType()
    this.getAllQualificationsCourses()
    this.getAllInstitutions()
    this.getalllocations()
  }

  async getDesignation() {
    const data = await this.common.getPosition().toPromise()
    if (!data.hasError) {
      this.Designation = data.result

    }
  }


  get formvalidation() {
    if (this.InformationData.firstName &&
      this.InformationData.lastName &&
      this.InformationData.personalEmail &&
      this.InformationData.genderId &&
      this.InformationData.residentialAddress) return true;
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


  get workformvalidate() {
    if (this.workData.hireDate && this.workData.dateofJoining && this.workData.salaryPerAnnum && this.workData.desginationId && this.workData.employeeTypeId
      && this.workData.departmentId && this.workData.reportingManagerId && this.workData.workEmail && this.workData.location && this.workData.onboardingId) return true;
    return false
  }

  get validdating() {
    if (this.workData.hireDate) return true; return false
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
  get validated() {
    if (this.UserData.dateOfBirth) return true;
    return false;
  }
  get validdate() {
    if (this.workData.dateofJoining) return true;
    return false;
  }


}
