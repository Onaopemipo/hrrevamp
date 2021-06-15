import { Router } from '@angular/router';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { ManageJobApplicantDTo, RecruitmentJobServiceProxy, RegisterApplicantServiceProxy } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-applicantssignup',
  templateUrl: './applicantssignup.component.html',
  styleUrls: ['./applicantssignup.component.scss']
})
export class ApplicantssignupComponent implements OnInit {

  show: boolean = false;
  applicantModel: ManageJobApplicantDTo = new ManageJobApplicantDTo();
  loading: boolean = false;
  btnProcessing: boolean = false;
  userToken: string = '';

  constructor(private applicant: RegisterApplicantServiceProxy, private alertMe: AlertserviceService, private router: Router) { }

  ngOnInit(): void {

  }

  viewpassword() {
    this.show = !this.show;
  }

  regiterApplicant(){
    this.btnProcessing = true;
    // this.applicantModel.
    this.applicant.registerApplicant(this.applicantModel).subscribe(data => {
      this.btnProcessing = false;
      if(!data.hasError && data.result.isSuccessful === true){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Applicant Created', 'Verify your account').subscribe(res => {
          if(res){
            this.router.navigateByUrl('/accountverify/' + this.applicantModel.email);
          }
        })
      }

      else {
        this.btnProcessing = false;
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, data.message, 'OK')
      }
    }, (error) => {

      if (error.status == 400) {
        this.btnProcessing = false;
        this.alertMe.openCatchErrorModal(this.alertMe.ALERT_TYPES.FAILED, error.title, "OK", error.errors);
      }
    })


  }

  checkEqualPass(){
    if(!(this.applicantModel.comfirmPassword == this.applicantModel.password)){
    this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, 'Passwords do not match', 'Dismiss')
    }
  }
}
