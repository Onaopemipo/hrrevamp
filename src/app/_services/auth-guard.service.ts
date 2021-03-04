import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRoute, CanLoad, Route } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthenticationService } from '../_services/authentication.service';
import { IVwUserObj, VwUserObj } from './service-proxies';

@Injectable()
export class AuthGuardService implements CanLoad {
  constructor(public auth: AuthService, public router: Router,
    private AuthenService: AuthenticationService) { }
  canLoad(routes: Route): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.auth.isAuthenticated().then(data => {
        localStorage.setItem('returnUrl', this.router.url);  
        if (!data) {
          this.router.navigate(['auth']);
          resolve(false);
        } else {
          this.AuthenService.getuser().then((usersdata: IVwUserObj[]) => {
            if (usersdata.length > 0) {
              const route = this.router.url.split('?')[0];
              if (usersdata[0]) {
                resolve(true);
              } else {
                this.router.navigate(['auth']);
                resolve(false);
                
              }
            } else {
              this.router.navigate(['auth']);
              resolve(false);
            }
          });

        }
      });
    });
  }
}
