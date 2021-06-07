import {
  GetLeaveRequestServiceProxy,
  GetLeaveTypesServiceProxy,
  LeaveReportListDTO
} from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { database } from 'faker';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { ColumnTypes, TableAction, TableActionEvent,ACTIONS } from 'app/components/tablecomponent/models';
import { IStatus, MyColor } from 'app/components/status/models';

export class LeaveHistoryWithStatus extends LeaveReportListDTO implements IStatus {
  leaveHistroy: LeaveReportListDTO;
  aloowedGenderName: string
  constructor(leaveHistroy: LeaveReportListDTO) {
    super(leaveHistroy);
    this.leaveHistroy = leaveHistroy;

  }
  get status() {
    return this.leaveHistroy.approvalStatus;
}
getStatusLabel() {
  if (this.leaveHistroy.approvalStatus === 'Pending') return 'Pending';
  if (this.leaveHistroy.approvalStatus === 'Approved') return 'Approved';
  if (this.leaveHistroy.approvalStatus === 'Rejected') return 'Rejected';

}
getStatusColor() {
  if (this.leaveHistroy.approvalStatus === 'Pending') return new MyColor(242, 153, 74);
  if (this.leaveHistroy.approvalStatus === 'Approved') return new MyColor(0, 153, 74);
  if (this.leaveHistroy.approvalStatus === 'Rejected') return new MyColor(253, 238, 238);
  return new MyColor(242, 0, 74);
}
 }
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
    { name: 'fullName', title: 'Name',type: ColumnTypes.Text },
    { name: 'leaveType', title: 'Leave Type',type: ColumnTypes.Text,listValue:[]},
    { name: 'startDate', title: 'Start Date',type: ColumnTypes.Date },
    { name: 'enddate', title: 'End Date',type: ColumnTypes.Date },
    { name: 'noOfDays', title: 'Number of Days',type: ColumnTypes.Text },
    { name: 'daysRem', title: 'Days Remaining',type: ColumnTypes.Text },
    { name: 'approvalStatus', title: 'Approval Status' ,type: ColumnTypes.Status, listValue:[{id:1,text:'Pending'},{id:2,text:'Approved'},{id:3,text:'Rejected'}]},
  ];


  LeaveHistory: string = 'Leave History';
  leaveRequestModel: any = ''
  filter = {
    LeaveYearId: undefined,
    LeaveTypeId: undefined,
    employeeName: null,
    startDate: undefined,
    endDate: undefined,
    noOfDays: undefined,
    remainingDays: undefined,
    pageSize: 10,
    pageNumber: 1
  }
  loading: boolean = false;
  allleaveHistory = [];
  totalItems = 0;
  currentPage = 1;
  allLeavetypes = [];
  constructor(private GetLeaveRequestService:GetLeaveRequestServiceProxy,
    private alertService: AlertserviceService, private GetLeaveTypesService: GetLeaveTypesServiceProxy) { }
    getAllLeaveType() {
      this.GetLeaveTypesService.getLeaveTypes(undefined, null, undefined, null,1,100).subscribe(res => {
        if (!res.hasError) {
          this.allLeavetypes = res.result;
          this.tableColumns[1].listValue = this.allLeavetypes.map(x => {
            let nObj = {
              id: x.id,
              text: x.name
            }
            return nObj;
          });
        }
      })
    }
  get showEmpty() {
    return this.allleaveHistory.length === 0;
  }
 
  ngOnInit(): void {
    this.getAllLeaveType()
    this.getLeaveRequestReport();
 
  }
  filterUpdated(filter: any) {
    this.filter = {...this.filter, ...filter};
    this.getLeaveRequestReport();
  }
  getLeaveRequestReport() {
    this.loading = true;
    this.GetLeaveRequestService.getLeaveReports(this.filter.LeaveTypeId, this.filter.LeaveYearId,
      this.filter.startDate, this.filter.endDate, this.filter.employeeName, this.filter.noOfDays,
      this.filter.remainingDays, this.filter.pageSize, this.filter.pageNumber)
      .subscribe(data => {
        this.loading = false;
        if (!data.hasError) {
          var lvHist = data.result.map(lvHist => new LeaveHistoryWithStatus(lvHist));
          this.allleaveHistory = lvHist;
         
          this.totalItems = data.totalRecord;
         
        }
        else {
          
        }

      }, (error) => {
        console.log(error);
      })
}
  modal(buttion) {
    if (buttion === TOP_ACTIONS.APPLY_FOR_LEAVE) {
 
      if (this.showAddPlanModal) {
        this.showAddPlanModal = false;
        setTimeout(() => {
          this.showAddPlanModal = true;
        }, 1000);
      } else {
        this.showAddPlanModal = true;
      }

    }
    if (buttion === TOP_ACTIONS.ADD_PLAN) {
      if (this.showLeavePlanModal) {
        this.showLeavePlanModal = false;
        setTimeout(() => {
          this.showLeavePlanModal = true;
        }, 1000);
      }else{ this.showLeavePlanModal = true;}
    }
  }
  showAddPlanModal = false;
  showLeavePlanModal = false;


  leaveRequestmodalClosed(event) {
    console.log(event)
    this.showAddPlanModal = event;
  }
  leavePlanmodalClosed(event) {
    console.log(event)
    this.showLeavePlanModal = event;
  }

}

