import { Transfer } from '@flowjs/ngx-flow';
import { UploadDocumentServiceProxy, DataServiceProxy, IDTextViewModel } from 'app/_services/service-proxies';
import { ActivatedRoute } from '@angular/router';
import { JobApplicantScheduleInterview, JobScheduleInterview, RecruitmentJobApplicationServiceProxy, RecuritmentJobApplicantServiceProxy, JobApplicantDto, JobPerferenceServiceProxy, ManageJobPreferenceDto } from './../../../_services/service-proxies';
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

  recruitmentAction = [
    {id: 0, label:'Interviewed'},
    {id: 1, label:'Shortlisted'},
    {id: 2, label:'Offer'},
    {id: 3, label:'Hired'},
  ]
  pageTitle: string = 'Profile';
  title: string = 'Set up your account';
  src: string = 'assets/icons/camera.jpg';
  selectedPanel: string = '';
  showModulesModal = false;
  modalPosition = 'Center';
  reference = '';
  beginSetup = true;
  updateProfile: boolean = false;
  newWork: boolean = false;
  jobInterview: JobApplicantScheduleInterview = new JobApplicantScheduleInterview();
  profileData: JobApplicantDto = new JobApplicantDto().clone();
  isApplicant: boolean = true;
  isInterviewer: boolean = false;
  isAdmin: boolean = false;
  applicantId: number = 0;
  skills: [] = [];
  addReferences: boolean = false;
  addSkiils: boolean = false;
  addEducation: boolean = false;
  preferenceModel: ManageJobPreferenceDto = new ManageJobPreferenceDto();
  addJobPreference: boolean = false;
  btnprocessing: boolean = false;
  tempRef:string;
  Entity: IDTextViewModel[] = [];
  entityId:number = 0;

  constructor(iconsLibrary: NbIconLibraries, private alertMe: AlertserviceService, private route: ActivatedRoute,
    private router: Router, private ineterview: RecruitmentJobApplicationServiceProxy, private preference: JobPerferenceServiceProxy,
     private profile: RecuritmentJobApplicantServiceProxy, private UploadDocumentService: UploadDocumentServiceProxy,
     private DataService: DataServiceProxy,  ) {
    iconsLibrary.registerFontPack('ion', { iconClassPrefix: 'ion' });
    iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
    iconsLibrary.registerFontPack('far', { packClass: 'far', iconClassPrefix: 'fa' });
  }
  ngOnInit(): void {
    this.applicantId = Number(this.route.snapshot.paramMap.get("id"));
    this.tempRef = `ref-${Math.ceil(Math.random() * 10e13)}`;
  }

  scheduleInterview(){
    this.ineterview.addUpdateScheduleJobInterviews(this.jobInterview).subscribe(data => {
      if(!data.hasError){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES, data.message, 'Dismiss').subscribe(res => {
          this.router.navigateByUrl('')
        })
      }
    });

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
      let srchR = this.Entity.find(f => f.text == "RETIREMENT");
      this.entityId = srchR.id;
    }
    // this.files = files.flowFile.file
    this.UploadDocumentService.uploadDocs(0, title, 0, this.entityId, false, refNumber, files.flowFile.file[0])
      .subscribe(data => {
      if (!data.hasError) {
        console.log('ref',this.tempRef)
        console.log('datarseee', data.result)
        if (!data.hasError) {
          this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, data.message, 'OK');

        } else {
          this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, data.message, 'OK')
        }
      }
    });
  }

  fetchProfile(){
    this.profile.getApplicantById(0).subscribe(data => {
      if(!data.hasError){
        this.profileData = data.result;
      }
    })
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
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Preference Media', 'Dismiss')
      }
    })
  }

  toggleEducation(){
    this.addEducation = !this.addEducation;
  }

  toggleReferences(){

  }

  addNewWork(){
    this.newWork = !this.newWork;
  }

  updateMyProfile(){
    this.btnprocessing = true;
    this.updateProfile = !this.updateProfile;
    this.profile.completeApplicantProfile(this.profileData).subscribe(data => {
      this.btnprocessing = false;
      if(!data.hasError && data.result.isSuccessful == true){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES, data.message, 'Dismiss')
      }
    })

  }

  addSkills(){
    // this.profileData.skills =
  }

 async getCountries(){
  // const data = await this.
  }


}
