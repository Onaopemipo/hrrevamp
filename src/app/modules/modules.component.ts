import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/_services/authentication.service';
import { IVwUserObj } from 'app/_services/service-proxies';
import { NgxPermissionsService } from 'ngx-permissions';
import { MENU_ITEMS } from './pages-menu';
@Component({
  selector: 'ngx-modules',
  templateUrl: './modules.component.html',
})
export class ModulesComponent implements OnInit {
  menu = MENU_ITEMS;
  user: IVwUserObj;
  constructor(private permissionsService: NgxPermissionsService, public authServ: AuthenticationService,private router: Router) {    
    this.authServ.getuser().then((users) => {
      if (users) {
        this.user = users[0];
        if (this.user) {
         this.permissionsService.loadPermissions(this.user.lstPermissions);
        } else {        
          this.authServ.clearusers();
          this.router.navigate(['auth'])
       }
      } else {
        this.authServ.clearusers();
        this.router.navigate(['auth'])
      }

     })
  }

  ngOnInit(): void {
  }

}
