import { Transfer } from '@flowjs/ngx-flow';
import { UploadDocumentServiceProxy, DataServiceProxy, IDTextViewModel, State, CommonServiceProxy, Institution, DropdownValue, JobRole, CompleteApplicantProfileServiceProxy } from 'app/_services/service-proxies';
import { ActivatedRoute } from '@angular/router';
import { JobApplicantScheduleInterview, JobScheduleInterview,GetApplicantByIdServiceProxy, RecruitmentJobApplicationServiceProxy, JobApplicantDto, JobPerferenceServiceProxy, ManageJobPreferenceDto, JobApplicantReference, JobApplicantWorkExperience, JobApplicantEducation, Country, Qualification, Course, SalaryRanage, Sector, ScheduleJobInterviewDto } from './../../../_services/service-proxies';
import { AlertserviceService } from './../../../_services/alertservice.service';
import { Component, OnInit } from '@angular/core';
import { NbIconLibraries } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-applicant-profile',
  templateUrl: './applicant-profile.component.html',
  styleUrls: ['./applicant-profile.component.scss']
})
export class ApplicantProfileComponent implements OnInit {

  interviewType = [
    {id: 0, label:'Oral'},
    {id: 1, label:'Written'},
  ]

 getbtnaction(actionname) {
    if (actionname == 'dashboard') {
      this.router.navigate(['/employeemodule/employeebulkupload'])
    }
    if (actionname == 'profile') {
      this.router.navigate(['/employeemodule/viewemployeerecords'])
    }

    if (actionname == 'preference') {
      this.router.navigate(['/employeemodule/viewemployeerecords'])
    }
  }

  allowmultipleselection: boolean = true;
  selectionHeader: string = "Select Employee";
  addbtnText: string = "Add Interviewer";
  pageTitle: string = 'Profile';
  title: string = 'Set up your account';
  src: string = 'assets/icons/camera.jpg';
  selectedPanel: string = '';
  showModulesModal = false;
  modalPosition = 'Center';
  reference = '';
  beginSetup = true;
  share: boolean = false;
  updateProfile: boolean = false;
  newWork: boolean = false;
  jobInterview: JobApplicantScheduleInterview = new JobApplicantScheduleInterview();
  profileData: JobApplicantDto = new JobApplicantDto().clone();
  isApplicant: boolean = false;
  isInterviewer: boolean = false;
  isAdmin: boolean = true;
  applicantId: number = 0;
  skills: [] = [];
  addReferences: boolean = false;
  addSkiils: boolean = false;
  addEducation: boolean = false;
  preferenceModel: ManageJobPreferenceDto = new ManageJobPreferenceDto();
  btnprocessing: boolean = false;
  tempRef:string;
  allCountries: Country [] = [];
  Entity: IDTextViewModel[] = [];
  gradeData: IDTextViewModel[] = [];
  entityId:number = 0;
  recruitmentAction: IDTextViewModel[] = [];
  referenceModel: JobApplicantReference = new JobApplicantReference();
  workExperienceModel: JobApplicantWorkExperience = new JobApplicantWorkExperience();
  educationModel: JobApplicantEducation = new JobApplicantEducation();
  allStates: State [] = [];
  qualificationData: Qualification [] = [];
  allInstitutions: Institution [] = []
  allCourses: Course [] = [];
  jobPreference:boolean = false;
  btnProcessing:boolean = false;
  sectorData: Sector [] = [];
  tempJobRole: string [] = [];
  tempJobType: string [] = [];
  tempIndustry: string [] = [];
  tempJobLevel: string [] = [];
  tempSalary: string [] = [];
  salaryData: SalaryRanage [] = [];
  jobLevelData: IDTextViewModel[] = [];
  jobRoleData: JobRole [] = [];
  jobTypeData: [] = []
  workChecker:boolean = false;
  expereinceData: string = '';
  interviewModel: ScheduleJobInterviewDto = new ScheduleJobInterviewDto();

  constructor(iconsLibrary: NbIconLibraries, private alertMe: AlertserviceService, private route: ActivatedRoute,
    private router: Router, private ineterview: RecruitmentJobApplicationServiceProxy, private preference: JobPerferenceServiceProxy,
     private profile: GetApplicantByIdServiceProxy, private UploadDocumentService: UploadDocumentServiceProxy,
     private DataService: DataServiceProxy, private commonService: CommonServiceProxy,private CompleteApplicantProfileService: CompleteApplicantProfileServiceProxy) {
    iconsLibrary.registerFontPack('ion', { iconClassPrefix: 'ion' });
    iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
    iconsLibrary.registerFontPack('far', { packClass: 'far', iconClassPrefix: 'fa' });
  }
  ngOnInit(): void {
    this.applicantId = Number(this.route.snapshot.paramMap.get("id"));
    this.tempRef = `ref-${Math.ceil(Math.random() * 10e13)}`;
    this.profile.getApplicantById(this.applicantId = Number(this.route.snapshot.paramMap.get("id"))).subscribe(data => {
      if(!data.hasError){
        this.profileData = data.result;
        this.expereinceData = JSON.parse(data.result.workExperience);
        console.log(this.expereinceData);
      }
    })
    this.getCountries();
    this.fetchCountries();
    this.getEntity();
    this.fetchQualifications();
    this.fetchRecActions();
    this.fetchSchools();
    this.fetchCourses();
    this.fetchGrade();
    this.fetchSector();
    this.fetchJobRole();
    this.fetchSalary();
    this.fetchJobLevel();

  }

  // scheduleInterview(){
  //   this.ineterview.addUpdateScheduleJobInterviews(this.jobInterview).subscribe(data => {
  //     if(!data.hasError){
  //       this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES, data.message, 'Dismiss').subscribe(res => {
  //         this.router.navigateByUrl('')
  //       })
  //     }
  //   }, (error) => {

  //     if (error.status == 400) {
  //       this.alertMe.openCatchErrorModal(this.alertMe.ALERT_TYPES.FAILED, error.title, "OK", error.errors);
  //     }
  //   });

  // }

  toggle(event){
    this.workExperienceModel.workHere = event;
    this.workChecker = event;
  }

  updateWorkExperience(){
    let applicant: JobApplicantDto = new JobApplicantDto();
    applicant.id = this.profileData.id;
    applicant.workExperience = JSON.stringify(this.workExperienceModel);
    this.CompleteApplicantProfileService.completeApplicantProfile(applicant).subscribe(data => {
      if(!data.hasError){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Profile Updated','Dismiss')
      }
    }, (error) => {

      if (error.status == 400) {
        this.alertMe.openCatchErrorModal(this.alertMe.ALERT_TYPES.FAILED, error.title, "OK", error.errors);
      }
    })
    console.log('Here is your string', applicant)
  }

  async fetchSchools(){
    const data = await this.commonService.getInstitutions().toPromise();
    if(!data.hasError){
      this.allInstitutions = data.result;
    }
  }

  async fetchCourses(){
    const data = await this.commonService.getCourses().toPromise();
    if(!data.hasError){
      this.allCourses = data.result;
    }
  }

  async fetchSalary(){
    const data = await this.DataService.getSalaryRange().toPromise();
    if(!data.hasError){
      this.salaryData = data.result;
    }
  }

  async fetchJobLevel(){
    const data = await this.DataService.getJobLevel().toPromise();
    if(!data.hasError){
      this.jobLevelData = data.result;
    }
  }

  async fetchJobRole(){
    const data = await this.commonService.getJobRoles().toPromise();
    if(!data.hasError){
      this.jobRoleData = data.result;
    }
  }


  openScorecard(){
    this.router.navigateByUrl('/interviewers/evaluation');
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
  selectedFile(files: Transfer, title) {
     const refNumber =  this.tempRef
    console.log('temp ref', this.tempRef)
    if (this.Entity.length > 0) {
      let srchR = this.Entity.find(f => f.text == "Apllicant Document");
      this.entityId = srchR.id;
    }

    this.UploadDocumentService.uploadDocs(0, title, 0, this.entityId, false, refNumber, files.flowFile.file[0])
      .subscribe(data => {
      if (!data.hasError) {
        console.log('ref',this.tempRef)
        if (!data.hasError) {
          this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, data.message, 'OK');

        } else {
          this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, data.message, 'OK')
        }
      }
    }, (error) => {

      if (error.status == 400) {
        this.alertMe.openCatchErrorModal(this.alertMe.ALERT_TYPES.FAILED, error.title, "OK", error.errors);
      }
    });
  }

  async fetchQualifications(){
    const data = await this.commonService.getQualifications().toPromise();
    if(!data.hasError){
      this.qualificationData = data.result;
      console.log('qualification:', this.qualificationData)
    }
  }

  fetchProfile(){
    this.profile.getApplicantById(this.applicantId).subscribe(data => {
      if(!data.hasError){
        this.profileData = data.result;
      }
    })
  }

  async fetchGrade(){
    const data = await this.DataService.getUniversityGrade().toPromise();
    if(!data.hasError){
      this.gradeData = data.result;
    }
  }

  async fetchSector(){
    const data = await this.DataService.getSector().toPromise();
    if(!data.hasError){
      this.sectorData = data.result;
    }
  }


  async fetchRecActions(){
    const data = await this.DataService.getRecruitmentAction().toPromise();
    if(!data.hasError){
      this.recruitmentAction = data.result;
    }
  }

  async fetchCountries(){
    const data = await this.DataService.getCountries().toPromise();
    if(!data.hasError){
      this.allCountries = data.result;
    }
  }

  toggleNewWork(){
    this.newWork = !this.newWork
  }

  toggleSkills(){
    this.addSkiils = !this.addSkiils

  }

  addPreference(){
    this.preference.addUpdateJobPreference(this.preferenceModel).subscribe(data => {
      if(!data.hasError){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Preference Added', 'Dismiss').subscribe(res => {
          this.preferenceModel = new ManageJobPreferenceDto();
          this.jobPreference = false;
        })
      }
    })
  }

  addNewJobPref(){
    this.tempJobRole.push(this.preferenceModel.jobName);
    this.tempJobType.push(this.preferenceModel.jobType);
    this.tempJobLevel.push(this.preferenceModel.jobLevel);
    this.tempIndustry.push(this.preferenceModel.indusry);
    this.tempSalary.push(this.preferenceModel.salaryRange);
  }

  updateEducation(){
    let applicant: JobApplicantDto = new JobApplicantDto();
    applicant.id = this.profileData.id;
    applicant.education = JSON.stringify(this.educationModel);
    this.CompleteApplicantProfileService.completeApplicantProfile(applicant).subscribe(data => {
      if(!data.hasError){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Profile Updated','Dismiss')
      }
    }, (error) => {

      if (error.status == 400) {
        this.alertMe.openCatchErrorModal(this.alertMe.ALERT_TYPES.FAILED, error.title, "OK", error.errors);
      }
    })
    console.log('Here is your string', applicant)
  }

  toggleEducation(){
    this.addEducation = !this.addEducation;
  }

  toggleJobPreference(){
    this.jobPreference = true;
  }

  toggleReferences(){
    this.addReferences = !this.addReferences
  }

  addNewWork(){
    this.newWork = !this.newWork;
  }

  updateMyProfile(){
    this.btnprocessing = true;
    this.updateProfile = !this.updateProfile;
    this.CompleteApplicantProfileService.completeApplicantProfile(this.profileData).subscribe(data => {
      this.btnprocessing = false;
      if(!data.hasError && data.result.isSuccessful == true){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES, data.message, 'Dismiss')
      }
    }, (error) => {

      if (error.status == 400) {
        this.alertMe.openCatchErrorModal(this.alertMe.ALERT_TYPES.FAILED, error.title, "OK", error.errors);
      }
    })

  }

  updateReferences(){
    console.log()
  }

  updateSkills(){
    // this.profileData.skills =
  }

 async getCountries(){
  // const data = await this.
  }

  toggleShareProfile(){
    this.share = true;
  }

  getSelectedEmployee(event,selectType) {
    if(selectType == 'employee'){
     this.interviewModel.interviewerEmployeeId = event[0].employeeNumber;
    }
 }

  scheduleForInterview(){
    this.btnProcessing = true;
    this.ineterview.shareApplicantProfileForInterview(this.interviewModel).subscribe(data => {
      this.btnProcessing = false;
      if(!data.hasError){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Success', 'Dismiss')
      }
    }, (error) => {

      if (error.status == 400) {
        this.alertMe.openCatchErrorModal(this.alertMe.ALERT_TYPES.FAILED, error.title, "OK", error.errors);
      }
    })
  }

  cancelSchedule(){
    this.share = false;
  }


}
