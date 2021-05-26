import { Router } from '@angular/router';
import { AlertserviceService } from './../../../_services/alertservice.service';
import { RecuritmentJobApplicantServiceProxy } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-email-otpverify',
  templateUrl: './email-otpverify.component.html',
  styleUrls: ['./email-otpverify.component.scss']
})
export class EmailOTPVerifyComponent implements OnInit {

  verifyOption: boolean = true;
  OTPstring: string = '';
  constructor(private applicant: RecuritmentJobApplicantServiceProxy, private alertMe: AlertserviceService, private router: Router) { }

  ngOnInit(): void {
  }

  changeOption() {
    this.verifyOption = !this.verifyOption;
  }

  resendOtp() {
    // console.log('A new OTP has been sent');
  }

  verifyUser(){
    this.applicant.verifyApplicantAccount(this.OTPstring).subscribe(data => {
      if(!data.hasError){
        this.router.navigateByUrl('/recruitment/applicantdashboard');
      }
    })
  }

}
