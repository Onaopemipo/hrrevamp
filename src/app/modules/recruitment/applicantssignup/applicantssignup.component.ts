import { Router } from '@angular/router';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { ManageJobApplicantDTo, RecruitmentJobServiceProxy, RecuritmentJobApplicantServiceProxy } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-applicantssignup',
  templateUrl: './applicantssignup.component.html',
  styleUrls: ['./applicantssignup.component.scss']
})
export class ApplicantssignupComponent implements OnInit {

  applicantModel: ManageJobApplicantDTo = new ManageJobApplicantDTo();

  constructor(private applicant: RecuritmentJobApplicantServiceProxy, private alertMe: AlertserviceService, private router: Router) { }

  ngOnInit(): void {

  }

  regiterApplicant(){
    this.applicant.registerApplicant(this.applicantModel).subscribe(data => {
      if(!data.hasError && data.result.isSuccessful === true){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Applicant Created', 'Verify your account').subscribe(res => {
          if(res){
            this.router.navigateByUrl('/accountverify/' + this.applicantModel.email);
          }
        })
      }

      else {
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, data.message, 'Dismiss')
      }
    })


  }

  checkEqualPass(){
    if(!(this.applicantModel.comfirmPassword == this.applicantModel.password)){
    this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, 'Passwords do not match', 'Dismiss')
    }
  }
}
