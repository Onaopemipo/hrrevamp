import { Injectable } from '@angular/core';
import { Router, CanActivate,ActivatedRoute,CanLoad,Route } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable()
export class AuthGuardService implements CanLoad {
  constructor(public auth: AuthService, public router: Router, public storage: Storage,
    private AuthenService: AuthenticationService,) {}
    canLoad(routes: Route): Promise<boolean> {
      return new Promise((resolve, reject) => {
        this.auth.isAuthenticated().then(data=>{  
          this.storage.set('returnUrl',this.router.url);            
          if(!data){      
            this.router.navigate(['preferedaction']);
            resolve(false);
          }else{
            this.AuthenService.getuser().then((usersdata:any)=>{
              if(usersdata.length > 0){        
               var route = this.router.url.split('?')[0];
               var isAdmin = usersdata[0].user.isAdmin;
            //  console.log(isAdmin, route);
                if((route == '/home' || route == '/profilepage' || route == '/') && isAdmin){        
                  this.router.navigate(['dashboard'])
                 resolve(false);
                }else{   
                  if(!usersdata[0].user.isProfileCompleted){
                   this.router.navigate(['profilepage']); 
                 resolve(false); 
                    }else{
                      resolve(true);
                    }
                }
              
              }else{
                this.router.navigate(['login']);
                resolve(false);
              }
            });
            
          }
        })
      });
      
 
    
    
  }
}
