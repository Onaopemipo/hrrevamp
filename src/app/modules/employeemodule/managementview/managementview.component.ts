import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-managementview',
  templateUrl: './managementview.component.html',
  styleUrls: ['./managementview.component.scss']
})
export class ManagementviewComponent implements OnInit {




  tableColumns = [
    { name: 'a', title: 'NAME OF QUALIFICATION' },
    { name: 'b', title: 'TYPE' },
    { name: 'c', title: 'COURSE' },
    { name: 'd', title: 'INSTITUTION' },
    { name: 'e', title: 'START DATE' },
    { name: 'f', title: 'END DATE' },
  ];
  selectedCase: string = 'personal_Info';
  selectedPanel: any = { title: 'personal_Info', label: 'Personal Information', status: 'Active' };
  employeeviewlist = [
    { title: 'personal_Info', label: 'Personal Information', status: 'Active', iconname:'person' },
    { title: 'confrimation_info', label: 'Confirmation Information', status: 'Inactive' ,iconname:'inbox'},
    { title: 'approval_log', label: 'Approval Log', status: 'Inactive',iconname:'file-text' },
  
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


  modal(buttion) {
    //if (buttion === TOP_ACTIONS.ADD_LEAVE_TYPE) {
    // this.showLeaveTypeModal = true
     
    //}
    
  }




}
