import { Component, OnInit } from '@angular/core';

enum TOP_ACTIONS {
  APPLY_FOR_LEAVE,
  ADD_PLAN
}


@Component({
  selector: 'ngx-leavehistory',
  templateUrl: './leavehistory.component.html',
  styleUrls: ['./leavehistory.component.scss']
})
export class LeavehistoryComponent implements OnInit {
  LeaveHistory: string = 'Leave History'
  topActionButtons = [
    { name: TOP_ACTIONS.APPLY_FOR_LEAVE, label: 'Apply For Leave', 'icon': 'plus', outline: true },
    { name: TOP_ACTIONS.ADD_PLAN, label: 'Add Plan', 'icon': 'plus', outline: false },
  ];


  tableColumns = [
    { name: 'a', title: 'Name' },
    { name: 'b', title: 'Leave Type' },
    { name: 'c', title: 'Start Date' },
    { name: 'd', title: 'End Date' },
    { name: 'd', title: 'Number of Days' },
    { name: 'd', title: 'Days Remaining' },
  ];

  constructor() { }

  ngOnInit(): void {

  }

  modal(buttion) {
    if (buttion === TOP_ACTIONS.APPLY_FOR_LEAVE) {
      this.showAddPlanModal = true;
    }
    if (buttion === TOP_ACTIONS.ADD_PLAN) {
      this.showLeavePlanModal = true;
    }
  }
  showAddPlanModal = false;
  showLeavePlanModal = false;


  //checked = false;

  toggle(checked: boolean) {
    //this.checked = checked;
    // }
  }
}

