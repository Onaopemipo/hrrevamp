import { ResetPasswordServiceProxy, ResestPasswordDTO } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  resetType: boolean = true;
  resetPass = new ResestPasswordDTO();
  constructor(private reset: ResetPasswordServiceProxy,) { }

  ngOnInit(): void {
  }

  resetOption() {
  this.resetType = !this.resetType;
  }

  resetPassword(){

    this.reset.resetPassword(this.resetPass).subscribe(data => {

    })
  }
}
