import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRoute, CanLoad, Route } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthenticationService } from '../_services/authentication.service';
import { IVwUserObj, VwUserObj } from './service-proxies';
import { AlertserviceService } from './alertservice.service';
enum ALERT_TYPES {
  SUCCESS = 'success',
  FAILED = 'danger',
  COPIED = 'copied',
}
@Injectable()
export class AuthGuardService implements CanLoad {
  constructor(public auth: AuthService, public router: Router,
    private AuthenService: AuthenticationService,public alertService: AlertserviceService) { }
  canLoad(routes: Route): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.auth.isAuthenticated().then(data => {
        console.log(data)
        localStorage.setItem('returnUrl', this.router.url);  
        if (!data) {
          // this.alertService.openModalAlert(ALERT_TYPES.FAILED, "Session TimeOut", "Login").subscribe(data => {
          //   this.AuthenService.clearusers();
          //   if (data) {

          //   }
          // });  
          resolve(false);
        } else {
          this.AuthenService.getuser().then((usersdata: IVwUserObj[]) => {
            console.log(usersdata)
            if (usersdata.length > 0) {
              const route = this.router.url.split('?')[0];
              if (usersdata[0]) {
                resolve(true);
              } else {
                this.alertService.openModalAlert(ALERT_TYPES.FAILED, "Session TimeOut", "Login").subscribe(data => {
                  this.AuthenService.clearusers();
                if (data) {
  
                }
              });            
                resolve(false);
                
              }
            } else {
              this.alertService.openModalAlert(ALERT_TYPES.FAILED, "Session TimeOut", "Login").subscribe(data => {
                this.AuthenService.clearusers();
              if (data) {

              }
            });
            
              resolve(false);
            }
          });

        }
      });
    });
  }
}
