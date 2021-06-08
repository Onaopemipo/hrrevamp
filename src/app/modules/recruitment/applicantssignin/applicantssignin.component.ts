import { AuthenticationService } from 'app/_services/authentication.service';
import { GetTokenServiceProxy, UserLoginDTO } from 'app/_services/service-proxies';
import { Router } from '@angular/router';
import { AlertserviceService } from './../../../_services/alertservice.service';
import { RecruitmentJobServiceProxy, RecuritmentJobApplicantServiceProxy, MangeLoginJobApplicantDTO, ManageJobApplicantDTo } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-applicantssignin',
  templateUrl: './applicantssignin.component.html',
  styleUrls: ['./applicantssignin.component.scss']
})
export class ApplicantssigninComponent implements OnInit {

  show: boolean = false;
  loginForm: FormGroup;
  applicantModel: ManageJobApplicantDTo = new ManageJobApplicantDTo();
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  btnprocessing: boolean = false;
  errorMsg: string = "";

  userDetails: MangeLoginJobApplicantDTO = new MangeLoginJobApplicantDTO();

  constructor(private applicant: RecuritmentJobApplicantServiceProxy, private alertMe: AlertserviceService,
    private router: Router, private loginServices: GetTokenServiceProxy,private AuthenService: AuthenticationService,  ) { }

  ngOnInit(): void {
  }

  viewpassword() {
    this.show = !this.show;
  }

  loginUser() {
    this.btnprocessing = true;
    this.loginServices.getToken(this.applicantModel).subscribe((resp) => {
      if (!resp.hasError) {
        this.openSuccessalert(resp.message);
        console.log(resp)
        console.log(resp.result)
       this.AuthenService.addUser(resp.result);
      } else {
        this.clearerror();
        this.errorMsg = resp.message;

      }
    }, (error) => {

      if (error.status == 400) {
        this.btnprocessing = false;
        this.alertMe.openCatchErrorModal(this.alertMe.ALERT_TYPES.FAILED, error.title, "OK", error.errors);
      }
    })
  }
  clearerror() {
  setTimeout(() => {
    this.errorMsg = "";
    this.btnprocessing = false;
  }, 3000);
}

  openSuccessalert(message) {
    this.alertMe.openModalAlert('success', message, 'Go to Dashboard')
      .subscribe(data => {
        this.btnprocessing = false;
        this.router.navigate(['/dashboard']);
      if (data) {

      }
    });
}

validateToken(){
  this.applicant.validate('').subscribe(data => {
    if(!data.hasError){
      console.log(data);
    }
  })
}

  authUser(){
    this.applicant.loginUser(this.userDetails).subscribe(data => {
      if(!data.hasError && data.result.isSuccessful === true){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Login Successful', 'Check Jobs').subscribe(res => {
          if(res){
            this.router.navigateByUrl('/applicantsmodule/applicants/')
          }
        })
      }
    })
  }

}
