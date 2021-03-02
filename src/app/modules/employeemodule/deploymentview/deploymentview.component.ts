import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-deploymentview',
  templateUrl: './deploymentview.component.html',
  styleUrls: ['./deploymentview.component.scss']
})
export class DeploymentviewComponent implements OnInit {

  selectedCase: string = 'personal_Info';
  selectedPanel: any = { title: 'personal_Info', label: 'Personal Information', status: 'Active' };
  employeeviewlist = [
    { title: 'personal_Info', label: 'Personal Information', status: 'Active', iconname:'person' },
    { title: 'promotion_info', label: 'Promotion Information', status: 'Inactive' ,iconname:'volume-down'},
  
  ];
  constructor() { }
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
