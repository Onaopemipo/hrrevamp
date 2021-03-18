import {
  CreateLeaveByAdminServiceProxy,
  PostServiceProxy,
  LeavePlanDTO,
  LeaveYearDTO,
  GetLeaveYearServiceProxy,
  GetLeaveTypesServiceProxy,
  GetLeaveYearsServiceProxy
} from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { database } from 'faker';
import { AlertserviceService } from 'app/_services/alertservice.service';

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

  allPlans:{} = {};
  thisDay: Date = new Date();
  allLeaveYear;
  allLeaveType;
  startYearDate = new Date();
  endYearDate = new Date();
  startDate: Date = this.leavePlanModel.startDate;
<<<<<<< HEAD
  endDate: Date;

  constructor(private leaveyear: GetLeaveYearServiceProxy, private leavetype: GetLeaveTypesServiceProxy) { }
=======
  leaveRequestModel: any = ''
  constructor(private leaveyear: GetLeaveYearsServiceProxy, private leavetype: GetLeaveTypesServiceProxy,
  private alertService: AlertserviceService) { }
>>>>>>> e21977e6038503eafab118f2f71ec57068c73954

  ngOnInit(): void {
    // this.updateCalcs;
  //  console.log(this.allLeaveYear);
   // this.fetchLeaveYear();
    this.fetchLeaveType();
    window.globalThis.a = this;
    console.log(this.allLeaveType)
    this.getEndDate();
  }

  modal(buttion) {
    if (buttion === TOP_ACTIONS.APPLY_FOR_LEAVE) {
      this.showAddPlanModal = true;
      this.fetchLeaveYear()
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
    if(this.leavePlanModel.startDate && this.leavePlanModel.noOfDays){
      this.leavePlanModel.endDate = new Date(this.leavePlanModel.startDate.getTime()+ this.leavePlanModel.noOfDays*24*60*60*1000);
      // this.leavePlanModel.endDate = this.endDate;
      console.log('Yo it is this date', this.leavePlanModel.endDate);
    }

  }

  // GetMy() => {
  //   return new Date(${startDate.getFullYear()},
  //     ${startDate.getMonth()},
  //     ${startDate.getDate()} + ${days})
  //  }

  fetchLeaveYear(){
    this.leaveyear.getLeaveYears(this.startYearDate,'',this.endYearDate,0).subscribe(data => {
      // if(!data.hasError){
        this.allLeaveYear = data.result;
        console.log(this.allLeaveYear);
      // }
    }, error => {
  console.log(error);
    })
  }

  fetchLeaveType(){
    this.leavetype.getLeaveTypes(true,0,false,0).subscribe(data => {
      // if(!data.hasError){
        this.allLeaveType = data.result;
        console.log(data);
      // }
    }, (error) => {
      console.log(error)
    })
  }
}

