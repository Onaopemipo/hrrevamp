import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { GetTokenServiceProxy, UserLoginDTO,MessageOutApiResult } from 'app/_services/service-proxies';
import { AuthenticationService } from '../../../_services/authentication.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  show: boolean = false;
  loginForm: FormGroup;
  userloginDto = new UserLoginDTO().clone(); 
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"; 
  btnprocessing: boolean = false;
  errorMsg: string = "";
  constructor(
    private AuthenService: AuthenticationService,
    private loginServices: GetTokenServiceProxy,
    private router: Router,
    private alertController: AlertserviceService
  ) { }
  viewpassword() {
    this.show = !this.show;
  }
  loginUser() {
    this.btnprocessing = true;
    this.loginServices.getToken(this.userloginDto).subscribe((resp) => {
      if (!resp.hasError) {
        this.openSuccessalert(resp.message);
        console.log(resp)
        console.log(resp.result)
       this.AuthenService.addUser(resp.result);
      } else {
        this.clearerror();
        this.errorMsg = resp.message;   

      }
    }, error => {
      this.clearerror();
        this.errorMsg = "Oops! Something went wrong, we are fixing it";
       
    })
  }
  clearerror() {
  setTimeout(() => {
    this.errorMsg = "";
    this.btnprocessing = false;
  }, 3000);
}

  openSuccessalert(message) {
    this.alertController.openModalAlert('success', message, 'Go to Dashboard')
      .subscribe(data => {
        this.btnprocessing = false;
        this.router.navigate(['/dashboard']);
      if (data) {
 
      }
    });
}
  ngOnInit(): void {

  }

}
