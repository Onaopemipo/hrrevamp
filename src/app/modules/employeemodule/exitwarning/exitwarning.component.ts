import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/_services/authentication.service';
import { IVwUserObj } from 'app/_services/service-proxies';

@Component({
  selector: 'ngx-exitwarning',
  templateUrl: './exitwarning.component.html',
  styleUrls: ['./exitwarning.component.scss']
})
export class ExitwarningComponent implements OnInit {
  user: IVwUserObj;
  constructor(private router: Router,public authServ: AuthenticationService,) { }

  ngOnInit(): void {
  }
  onClick() {
    this.authServ.getuser().then(async (users: IVwUserObj[]) => {
      if (users) {
        if (users.length > 0) {
          this.user = users[0];
          this.router.navigate(['/employeemodule/exitrequest'],{queryParams:{employeeId: this.user.employee_id,exitUser:'User'}});
}
}
})

  }
  gohome() {
    this.router.navigateByUrl('/');
  }
}
