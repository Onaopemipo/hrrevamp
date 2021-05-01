import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RetirementServiceProxy, RetirmentDTO } from 'app/_services/service-proxies';

@Component({
  selector: 'ngx-existrequest',
  templateUrl: './existrequest.component.html',
  styleUrls: ['./existrequest.component.scss']
})
export class ExistrequestComponent implements OnInit {


  selectedOption: string = '';
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
  allExitRequest:RetirmentDTO[] = [];
  constructor(private activatedRoute: ActivatedRoute,private router: Router,
    private RetirementService: RetirementServiceProxy,) { }
  getEmployeeDetails(employeeId) {
  
  }
  getRetirementDetails(employeeId) {
    this.RetirementService.getRetirees(this.filter.ID, this.filter.FullName,this.filter.EmployeeId,this.filter.DateRequested,this.filter.Type,this.filter.Status,this.filter.IsCleared,this.filter.retirmentTypeid,this.filter.startdate,this.filter.endate,this.filter.PageSize,this.filter.PageNumber)
    .subscribe(data => {
      if (!data.hasError) {
        this.allExitRequest = data.result;
        if (this.allExitRequest.length < 1) {
          this.router.navigate(['/employeemodule/exitwarning']);
        }
    }
  })
  }
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(data => {
      if (data) {
        if (data.employeeId) {
          this.getRetirementDetails(data.employeeId);
          this.getEmployeeDetails(data.employeeId);
        } else {
          
       }
     }
   })
  }

 // checked = false;

  toggle(checked: boolean) {
   // this.checked = checked;
  }

}

