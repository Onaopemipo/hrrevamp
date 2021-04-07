import { Component, OnInit } from '@angular/core';
import { EmployeeDeploymentServiceProxy, CreateDeploymentViewModel } from '../../../_services/service-proxies';


enum TOP_ACTIONS {
  
  BATCH_DEPLOYMENT
}

@Component({
  selector: 'ngx-employeedeploymentmanagement',
  templateUrl: './employeedeploymentmanagement.component.html',
  styleUrls: ['./employeedeploymentmanagement.component.scss']
})
export class EmployeedeploymentmanagementComponent implements OnInit {

  topActionButtons = [
    
    { name: TOP_ACTIONS.BATCH_DEPLOYMENT, label: 'BATCH DEPLOYMENT', 'icon': 'plus', outline: false },
  ];

  tableColumns =[
    { name: 'a', title: 'S/N' },
    { name: 'b', title: 'EMPLOYEE' },
    { name: 'refNo', title: 'STAFF NO' },
    { name: 'effective_date', title: 'APPOINTMENT DATE' },
    { name: 'e', title: 'PROBATION PERIOD' },
    { name: 'request_by', title: 'REQUESTED BY' },
    { name: 'log_status', title: 'REQUESTED STATUS' },
  ]

  data:CreateDeploymentViewModel[] = []
  constructor(private EmployeeDeploymentServiceProxy:EmployeeDeploymentServiceProxy) { }

  ngOnInit(): void {
    this.EmployeeDeploymentServiceProxy.employeeDeployment().toPromise().then(
      deployment => {this.data= deployment.result}
    )
  }

  getuploadedfile(event){
    console.log('event')
  }
modal(buttion) {
  if(buttion === TOP_ACTIONS.BATCH_DEPLOYMENT){

  }
}
}
