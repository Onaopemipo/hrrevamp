import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RetirementServiceProxy, RetirmentDTO,FetchEmployeeByIdServiceProxy,EmployeeDTO } from 'app/_services/service-proxies';

@Component({
  selector: 'ngx-existrequest',
  templateUrl: './existrequest.component.html',
  styleUrls: ['./existrequest.component.scss']
})
export class ExistrequestComponent implements OnInit {

  createNewEmployee: EmployeeDTO = new EmployeeDTO().clone();
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
  allExitRequest: RetirmentDTO[] = [];
  jobName: string = '';
  departmentName: string = '';
  constructor(private activatedRoute: ActivatedRoute,private router: Router,
    private RetirementService: RetirementServiceProxy,private FetchEmployeeByIdService: FetchEmployeeByIdServiceProxy,) { }
  getEmployeeDetails(employeeId) {
    this.FetchEmployeeByIdService.getEmployeeById(employeeId).subscribe((data) => {
      if (!data.hasError) {
        this.createNewEmployee = data.result;
        this.jobName = this.createNewEmployee.contracts.length > 0 ? this.createNewEmployee.contracts[0].jobName : "";
        this.departmentName = this.createNewEmployee.contracts.length > 0 ? this.createNewEmployee.contracts[0].departmentName : "";
        console.log(this.createNewEmployee);        
      }
    });
  }
  getRetirementDetails(employeeId,exitUser) {
    this.filter.EmployeeId = employeeId
    this.RetirementService.getRetirees(this.filter.ID, this.filter.FullName,this.filter.EmployeeId,this.filter.DateRequested,this.filter.Type,this.filter.Status,this.filter.IsCleared,this.filter.retirmentTypeid,this.filter.startdate,this.filter.endate,this.filter.PageSize,this.filter.PageNumber)
    .subscribe(data => {
      if (!data.hasError) {
        this.allExitRequest = data.result;
        if (this.allExitRequest.length < 1 && exitUser == "User") {
          //this.router.navigate(['/employeemodule/exitwarning']);
        }
    }
  })
  }
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(data => {
      if (data) {
        if (data.employeeId) {
          var exitU = data.exitUser ? data.exitUser : "";
          this.getRetirementDetails(data.employeeId, exitU);
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

