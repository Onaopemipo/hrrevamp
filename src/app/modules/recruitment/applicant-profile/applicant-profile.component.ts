import { ActivatedRoute } from '@angular/router';
import { JobApplicantScheduleInterview, JobScheduleInterview, RecruitmentJobApplicationServiceProxy, RecuritmentJobApplicantServiceProxy, JobApplicantDto } from './../../../_services/service-proxies';
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
  addEducation:boolean;
  isApplicant: boolean = false;
  isInterviewer: boolean = false;
  isAdmin: boolean = true;
  applicantId: number = 0;

  constructor(iconsLibrary: NbIconLibraries, private alertMe: AlertserviceService, private route: ActivatedRoute,
    private router: Router, private ineterview: RecruitmentJobApplicationServiceProxy, private profile: RecuritmentJobApplicantServiceProxy  ) {
    iconsLibrary.registerFontPack('ion', { iconClassPrefix: 'ion' });
    iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
    iconsLibrary.registerFontPack('far', { packClass: 'far', iconClassPrefix: 'fa' });
  }
  ngOnInit(): void {
    this.applicantId = Number(this.route.snapshot.paramMap.get("id"));
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

  addNewWork(){
    this.newWork = !this.newWork;
  }

  updateMyProfile(){
    this.updateProfile = !this.updateProfile;
    this.profile.completeApplicantProfile(this.profileData).subscribe(data => {
      if(!data.hasError && data.result.isSuccessful == true){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES, data.message, 'Dismiss')
      }
    })

  }

  addSkills(){

  }

 async getCountries(){
  // const data = await this.
  }


}
