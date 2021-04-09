import { Component, OnInit } from '@angular/core';
import { EmployeeDeploymentServiceProxy, CreateDeploymentViewModel } from '../../../_services/service-proxies';

@Component({
  selector: 'ngx-deploymentview',
  templateUrl: './deploymentview.component.html',
  styleUrls: ['./deploymentview.component.scss']
})
export class DeploymentviewComponent implements OnInit {
 AllEmployee: CreateDeploymentViewModel[] = []
  selectedCase: string = 'personal_Info';
  selectedPanel: any = { title: 'personal_Info', label: 'Personal Information', status: 'Active' };
  employeeviewlist = [
    { title: 'personal_Info', label: 'Personal Information', status: 'Active', iconname:'person' },
    { title: 'promotion_info', label: 'Promotion Information', status: 'Inactive' ,iconname:'volume-down'},
  
  ];
  constructor(private EmployeeDeploymentServiceProxy:EmployeeDeploymentServiceProxy) { }
  selectPanel(hiringlist, i) {
    this.selectedPanel = hiringlist;
    
    this.employeeviewlist.forEach(value => {
      value.status = 'Inactive';
    })
    this.employeeviewlist[i].status = 'Active';
    this.selectedCase = this.employeeviewlist[i].title; 
   
  }
  ngOnInit(): void {
  }

}
