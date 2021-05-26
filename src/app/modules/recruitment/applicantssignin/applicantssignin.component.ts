import { Router } from '@angular/router';
import { AlertserviceService } from './../../../_services/alertservice.service';
import { RecruitmentJobServiceProxy, RecuritmentJobApplicantServiceProxy, MangeLoginJobApplicantDTO } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-applicantssignin',
  templateUrl: './applicantssignin.component.html',
  styleUrls: ['./applicantssignin.component.scss']
})
export class ApplicantssigninComponent implements OnInit {

  userDetails: MangeLoginJobApplicantDTO = new MangeLoginJobApplicantDTO();

  constructor(private applicant: RecuritmentJobApplicantServiceProxy, private alertMe: AlertserviceService, private router: Router) { }

  ngOnInit(): void {
  }

  authUser(){
    this.applicant.loginUser(this.userDetails).subscribe(data => {
      if(!data.hasError && data.result.isSuccessful === true){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Login Successful', 'Dismiss').subscribe(res => {
          if(res){
            this.router.navigateByUrl('/applicantsmodule/applicants/')
          }
        })
      }
    })
  }

}
