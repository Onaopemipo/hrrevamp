import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbDateService } from '@nebular/theme';
import { AlertserviceService, ALERT_TYPES } from 'app/_services/alertservice.service';
import {
  GetLeaveTypesServiceProxy,
  FetchLeavePlanServiceProxy, LeavePlanDTO, LeavePlanResource, MessageOutApiResult, 
  PostServiceProxy,
  ManageLeaveRequestDTO,
  CommonServiceProxy,
  GetLeaveYearsServiceProxy,
  CreateLeaveByAdminServiceProxy,
  DeleteServiceProxy
} from '../../../_services/service-proxies';
import { ColumnTypes, TableAction, TableActionEvent,ACTIONS } from 'app/components/tablecomponent/models';
import { IStatus, MyColor } from 'app/components/status/models';

export class LeavePlanWithStatus extends LeavePlanResource implements IStatus {
  leavePlan: LeavePlanResource;
  
  constructor(leavePlan: LeavePlanResource) {
    super(leavePlan);
    this.leavePlan = leavePlan;

  }
  get status() {
    return this.leavePlan.isApproved;
}
  getStatusLabel() {
    if (this.leavePlan.isApproved === 0) return 'Pending';
    if (this.leavePlan.isApproved === 1) return 'Approved';
    if (this.leavePlan.isApproved === 2) return 'Rejected';

  }
  getStatusColor() {
    if (this.leavePlan.isApproved  === 0) return new MyColor(242, 153, 74);
    if (this.leavePlan.isApproved === 1) return new MyColor(0, 153, 74);
    if (this.leavePlan.isApproved === 2) return new MyColor(253, 238, 238);
    return new MyColor(242, 0, 74);
 }
 }
enum TOP_ACTIONS {
  APPLY_FOR_LEAVE,
  ADD_PLAN
}

@Component({
  selector: 'ngx-leave-plan',
  templateUrl: './leave-plan.component.html',
  styleUrls: ['./leave-plan.component.scss']
})
export class LeavePlanComponent implements OnInit {

  allowmultipleselection: boolean = false;
  selectionHeader: string = "Select Employee";
  addbtnText: string = "Add Employee";
  filter = {
    is_approved: 1,
    year_id: null,
    empno: null,
    start_date: null,
    end_date: null,
    page_size: 20,
    page_no: 1
  }

 

  topActionButtons = [
    { name: TOP_ACTIONS.APPLY_FOR_LEAVE, label: 'Apply For Leave', 'icon': 'plus', outline: true },
    { name: TOP_ACTIONS.ADD_PLAN, label: 'Add Plan', 'icon': 'plus', outline: false },
  ];
  tableColumns = [
    { name: 'a', title: 'Number' },
    { name: 'b', title: 'Name' },
    { name: 'c', title: 'Department' },
    { name: 'd', title: 'Designation' },
  ];
  get showFirstName() {
    return this.selectedOption === '1';
  }

  LeaveData = [];
  loading = false;
  modificationStatus: boolean = false;
  totalItems = 0;
  currentPage = 1;
  constructor(
    private FetchLeavePlanServiceProxy: FetchLeavePlanServiceProxy,
    public dateService: NbDateService<Date>,
    private alertservice: AlertserviceService,
    private DeleteService:DeleteServiceProxy,
 ) { }

  ngOnInit(): void {
    this.getleavePlan();
  }


  showAddPlanModal = false;
  showLeavePlanModal = false;
  selectedOption = '1';
  b = 'mmm';
  value = 'aaaa';

  modal(buttion) {
    if (buttion === TOP_ACTIONS.APPLY_FOR_LEAVE) {
      this.showAddPlanModal = true;
    }
    if (buttion === TOP_ACTIONS.ADD_PLAN) {
      this.showLeavePlanModal = true;
    }
  }
  tableActions: TableAction[] = [
    { name: ACTIONS.EDIT, label: 'Edit' },
    { name: ACTIONS.DELETE, label: 'Delete' },
  ];
  tableActionClicked(event: TableActionEvent) {
    if (event.name == "1") {
      this.LeaveData = event.data;
      this.showAddPlanModal = true;
      this.modificationStatus = true;
    }
    if (event.name == "2") {
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.CONFIRM, event.data.yearName, 'Yes').subscribe(data => {
        if (data == "closed") {
          this.deleteleavePlan(event.data.id);
        }
  
      })
    }
  }
  deleteleavePlan(id) {
    this.DeleteService.deleteLeavePlan(id).subscribe(response => {
      if (!response.hasError) {
        this.getleavePlan();
        this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.SUCCESS, response.message, 'OK');
        this.modificationStatus = false;
      } else {
        this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.FAILED, response.message, 'OK')
      }

    }, (error) => {

      if (error.status == 400) {
        this.alertservice.openCatchErrorModal(this.alertservice.ALERT_TYPES.FAILED, error.title, "Ok", error.errors);
      }
    });
  
  }
  filterUpdated(filter: any) {
    this.filter = {...this.filter, ...filter};
    this.getleavePlan();
  }
  get showEmpty() {
    return this.LeaveData.length === 0;
  }
  getleavePlan() {
    this.loading = true;
    this.FetchLeavePlanServiceProxy.fetchLeavePlans(
      this.filter.is_approved,
      this.filter.year_id,
      this.filter.empno,
      this.filter.start_date,
      this.filter.end_date,
      this.filter.page_size,
      this.filter.page_no
    ).subscribe(data => {
      this.loading = false;
      this.modificationStatus = false;
      if (!data.hasError) {
        var lvyr = data.result.map(lvyr => new LeavePlanWithStatus(lvyr));
        console.log(lvyr)
        this.LeaveData = lvyr;
       
        this.totalItems = data.totalRecord;
       
      } else {
        
      }
     
    }, (error) => {
      console.log(error);
    });
  }

  filterLeavePlan(is_approved = []) {
   
    let tabtittle = "";
    is_approved.forEach(value => {
      if (value.activeValue) tabtittle = value.tabTitle;
    });
    console.log(tabtittle);
     this.filter.is_approved = tabtittle == 'Pending'? 0 : (tabtittle == 'Approved'?1 : 2);
    this.getleavePlan();
  }

}

