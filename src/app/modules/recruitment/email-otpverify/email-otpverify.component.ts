import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-email-otpverify',
  templateUrl: './email-otpverify.component.html',
  styleUrls: ['./email-otpverify.component.scss']
})
export class EmailOTPVerifyComponent implements OnInit {

  verifyOption: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  changeOption(){
    this.verifyOption = !this.verifyOption;
  }

  resendOtp(){
    console.log("A new OTP has been sent")
  }

}
