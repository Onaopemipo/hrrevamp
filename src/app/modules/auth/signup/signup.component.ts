import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router} from '@angular/router';
import { CompanyDTO } from 'app/_services/service-proxies';
@Component({
  selector: 'ngx-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  companyDTO = new CompanyDTO().clone();
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"; 
  btnprocessing: boolean = false;
  errorMsg: string = "";
  show: boolean = false;
  constructor(private route: Router) { }
  viewpassword() {
    this.show = !this.show;
  }
  gotoSetup() {
    localStorage.setItem('tenantSetup',JSON.stringify(this.companyDTO))
    this.route.navigate(['/onboarding/accountsetup']);
  }
  ngOnInit(): void {
  }

}
