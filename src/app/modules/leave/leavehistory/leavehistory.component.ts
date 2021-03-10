import { CreateLeaveByAdminServiceProxy, LeaveRequestPayload, PostServiceProxy, LeavePlanDTO } from './../../../_services/service-proxies';
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


  LeaveHistory: string = 'Leave History';
  leavePlanModel: LeavePlanDTO = new LeavePlanDTO().clone();
  leaveRequestModel: LeaveRequestPayload = new LeaveRequestPayload().clone();
  allPlans:{} = {};
  thisDay: Date = new Date();

  constructor() { }

  ngOnInit(): void {
    this.updateCalcs;
    console.log(this.thisDay);

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


  updateCalcs(event){
    console.log(event);
  }

  toggle(checked: boolean) {
    // this.checked = checked;
    // }
  }

  getHistory(){
    // this.newLeave.createleavebyadmin()
  }

  createLeavePlan(){
    // this.plan.createleaveplan(this.leavePlanModel)._subscribe(data => {
    //   this.allPlans = data.result;
    // })
  }
}

