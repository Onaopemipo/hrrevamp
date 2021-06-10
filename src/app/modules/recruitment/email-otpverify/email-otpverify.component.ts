import { Router, ActivatedRoute } from '@angular/router';
import { AlertserviceService } from './../../../_services/alertservice.service';
import { RegenerateOTPTokenServiceProxy, VerifyApplicantAccountServiceProxy } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-email-otpverify',
  templateUrl: './email-otpverify.component.html',
  styleUrls: ['./email-otpverify.component.scss']
})
export class EmailOTPVerifyComponent implements OnInit {

  verifyOption: boolean = true;
  OTPstring: string = '';
  loginUserEmail:string = '';
  code1:string = '';
  code2:string = '';
  code3:string  = '';
  code4:string  = '';
  code5:string  = '';
  code6:string  = '';
  applicantEmail:string = '';

  constructor(private applicant: RegenerateOTPTokenServiceProxy,
    private VerifyApplicantAccountService: VerifyApplicantAccountServiceProxy,
    private route: ActivatedRoute, private alertMe: AlertserviceService, private router: Router) { }

  ngOnInit(): void {
    this.applicantEmail = this.route.snapshot.paramMap.get("id");
  }

  changeOption() {
    this.verifyOption = !this.verifyOption;
  }

  resendOtp() {
    this.applicant.regenerateOTPToken(this.loginUserEmail).subscribe(data => {
      if(!data.hasError){

      }
    })
  }

  verifyUser(){
    let OTPstring = this.code1.toString() + this.code2.toString()  + this.code3.toString()  + this.code4.toString()  + this.code5.toString()  + this.code6.toString()
    this.VerifyApplicantAccountService.verifyApplicantAccount(OTPstring).subscribe(data => {
      if(!data.hasError && data.result.isSuccessful){
        console.log(data.result)
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, data.message, 'View Jobs').subscribe(res => {
          if(res){
            this.router.navigateByUrl('/recruitment/applicantdashboard');
          }
        })

      } else {
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, data.message, 'Dismiss')
      }
    })
  }

  async codeValidation(nextElement,codeElement,value){
    var reg = new RegExp('^[+.0-9]+$');
    if(value !== "" && value && reg.test(value)){
      //if(codeElement != "code6")
      // nextElement.setFocus();
    }else{
   if(codeElement == "code1") this.code1 = "";
   if(codeElement == "code2") this.code2 = "";
   if(codeElement == "code3") this.code3 = "";
   if(codeElement == "code4") this.code4 = "";
   if(codeElement == "code5") this.code5 = "";
   if(codeElement == "code6") this.code6 = "";
    }
  }

  async verifyOTP(){
    let receivedotp = this.code1 + this.code2 + this.code3 + this.code4 + this.code5 + this.code6;

  }

}
