import { CreateLeaveByAdminServiceProxy, LeaveRequestPayload, PostServiceProxy, LeavePlanDTO, LeaveYearDTO, GetLeaveYearServiceProxy, GetLeaveTypesServiceProxy } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { database } from 'faker';

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
  allLeaveYear;
  allLeaveType;
  startYearDate = new Date();
  endYearDate = new Date();
  startDate: Date = this.leavePlanModel.startDate;

  constructor(private leaveyear: GetLeaveYearServiceProxy, private leavetype: GetLeaveTypesServiceProxy) { }

  ngOnInit(): void {
    // this.updateCalcs;
    console.log(this.allLeaveYear);
    this.fetchLeaveYear();
    this.fetchLeaveType();
    window.globalThis.a = this;
    console.log(this.allLeaveType)
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

  getEndDate(){

  }

  fetchLeaveYear(){
    this.leaveyear.getleaveyear(this.startYearDate,'',this.endYearDate,0).subscribe(data => {
      // if(!data.hasError){
        this.allLeaveYear = data.result;
        console.log(this.allLeaveYear);
      // }
    })
  }

  fetchLeaveType(){
    this.leavetype.getleavetypes(true,0,false,0).subscribe(data => {
      // if(!data.hasError){
        this.allLeaveType = data.result;
        console.log(this.allLeaveType);
      // }
    })
  }
}

