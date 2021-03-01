import { Component, OnInit } from '@angular/core';


enum TOP_ACTIONS {
  APPLY_FOR_LEAVE,
  ADD_PLAN
}

@Component({
  selector: 'ngx-employeeview',
  templateUrl: './employeeview.component.html',
  styleUrls: ['./employeeview.component.scss']
})
export class EmployeeviewComponent implements OnInit {

  topActionButtons = [
    { name: TOP_ACTIONS.APPLY_FOR_LEAVE, label: 'Add', 'icon': 'plus', outline: true },
  
  ];

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





