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

  constructor() { }

  ngOnInit(): void {
  }


  modal(buttion) {
    //if (buttion === TOP_ACTIONS.ADD_LEAVE_TYPE) {
    // this.showLeaveTypeModal = true
     
    //}
    
  }

}





