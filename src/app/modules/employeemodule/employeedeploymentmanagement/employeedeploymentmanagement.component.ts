import { Component, OnInit } from '@angular/core';

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
    { name: 'c', title: 'STAFF NO' },
    { name: 'd', title: 'APPOINTMENT DATE' },
    { name: 'e', title: 'PROBATION PERIOD' },
    { name: 'f', title: 'REQUESTED BY' },
    { name: 'g', title: 'REQUESTED STATUS' },
  ]


  constructor() { }

  ngOnInit(): void {
  }

  getuploadedfile(event){
    console.log('event')
  }
modal(buttion) {
  if(buttion === TOP_ACTIONS.BATCH_DEPLOYMENT){

  }
}
}
