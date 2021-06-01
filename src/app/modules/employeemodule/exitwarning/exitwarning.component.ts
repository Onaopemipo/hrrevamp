import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/_services/authentication.service';
import { IVwUserObj, RetirementServiceProxy, RetirmentDTO } from 'app/_services/service-proxies';

@Component({
  selector: 'ngx-exitwarning',
  templateUrl: './exitwarning.component.html',
  styleUrls: ['./exitwarning.component.scss']
})
export class ExitwarningComponent implements OnInit {
  user: IVwUserObj;
  allExitRequest: RetirmentDTO[] = [];
  filter = {
    ID: undefined,
    FullName: undefined,
    EmployeeId: undefined,
    DateRequested: undefined,
    Type: undefined,
    Status: undefined,
    IsCleared: undefined,
    retirmentTypeid: undefined,
    startdate: undefined,
    endate: undefined,
    PageSize: 10,
    PageNumber: 1
  }
  loading = false;
  constructor(private router: Router, public authServ: AuthenticationService,
    private RetirementService: RetirementServiceProxy) { }

    getRetirementDetails(employeeId) {
      this.filter.EmployeeId = employeeId
      this.RetirementService.getRetirees(this.filter.ID, this.filter.FullName,this.filter.EmployeeId,this.filter.DateRequested,this.filter.Type,this.filter.Status,this.filter.IsCleared,this.filter.retirmentTypeid,this.filter.startdate,this.filter.endate,this.filter.PageSize,this.filter.PageNumber)
        .subscribe(data => {
          this.loading = false;
        if (!data.hasError) {
          this.allExitRequest = data.result;     
      }
    })
    }
  
  ngOnInit(): void {
    this.loading = true;
    this.authServ.getuser().then(async (users: IVwUserObj[]) => {
      if (users) {
        if (users.length > 0) {
          this.getRetirementDetails(users[0].employee_id);
        }
      }
    });
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
