import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  LeaveEntitlementPayload, LeaveEntitlementServiceProxy, LeaveEntitlementResource,
  Grade, GetLeaveTypesServiceProxy
} from '../../../_services/service-proxies';
import { AlertserviceService } from '../../../_services/alertservice.service'
import { ColumnTypes, TableAction, TableActionEvent } from 'app/components/tablecomponent/models';




enum ACTIONS { EDIT = '1', DELETE = '2' }

@Component({
  selector: 'ngx-leaveentitlement',
  templateUrl: './leaveentitlements.component.html',
  styleUrls: ['./leaveentitlements.component.scss']
})
export class LeaveentitlementsComponent implements OnInit {
  pageName: string = "Leave Entitlement";
  LeaveEntitlement: LeaveEntitlementResource[] = [];
  allGrades: Grade[] = [];
  leavEntitlementForm: FormGroup;
  newleaveEntitlement = new LeaveEntitlementPayload().clone();
  topActionButtons = [
    { name: 'add_entitlement', label: 'Add Entitlement', 'icon': 'plus', outline: false },
  ];

  tableColumns = [
    { name: 'leaveType', title: 'Leave Type', type: ColumnTypes.Text },
    { name: 'grade', title: 'Grade', type: ColumnTypes.Text },
    { name: 'entitlement', title: 'Entitlement', type: ColumnTypes.Text },
  ];
  yearName: string = ''
  mindate: Date;
  maxdate: Date;

  tableActions: TableAction[] = [
    { name: ACTIONS.EDIT, label: 'Edit' },
    { name: ACTIONS.DELETE, label: 'Delete' },
  ];

  filter = {
    yearStartDate: null,
    yearName: null,
    yearEndDate: null,
    companyID: undefined,
    pageSize: 10,
    pageNumber: 1
  }

  totalItems = 0;
  currentPage = 1;

  submitbtnPressed: boolean = false;
  loading: boolean = false;
  modificationStatus: boolean = false;
  leaveTypeList = [];
  leaveTypefilter = {
    IsAnnualLeave: undefined,
    MaxDays: null,
    IsGradeDependent: undefined,
    MinDays: undefined,
    pageSize: 10,
    pageNumber: 1
  }
  constructor(
    private LeaveEntitlementService: LeaveEntitlementServiceProxy,
    private GetLeaveTypesService: GetLeaveTypesServiceProxy,
    private alertservice: AlertserviceService,
  ) { }


  tableActionClicked(event: TableActionEvent) {
    if (event.name == "1") {
      this.newleaveEntitlement = event.data;
      this.showLeaveYearModal = true;
      this.modificationStatus = true;
    }
    if (event.name == "2") {
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.CONFIRM, event.data.yearName, 'Yes').subscribe(data => {
        if (data == "closed") {
          this.deleteleaveYear(event.data.id);
        }

      })
    }
  }
  filterUpdated(filter: any) {
    this.filter = { ...this.filter, ...filter };
    this.getleaveEntitlement();
  }
  get showEmpty() {
    return this.LeaveEntitlement.length === 0;
  }
  modal(buttion) {
    if (buttion === 'add_leave_year') {
      this.showLeaveYearModal = true;
      this.modificationStatus = false;
    }
  }


  deleteleaveYear(id) {
    this.LeaveEntitlementService.deleteLeaveEntitlement(id).subscribe(response => {
      if (!response.hasError) {
        this.getleaveEntitlement();
        this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.SUCCESS, response.message, 'OK');
        this.newleaveEntitlement = new LeaveEntitlementPayload().clone();
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
  createleaveYear() {
    this.submitbtnPressed = true;
    this.LeaveEntitlementService.addLeaveEntitlement(this.newleaveEntitlement).subscribe((response) => {
      if (!response.hasError) {
        this.getleaveEntitlement();
        this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.SUCCESS, response.message, 'OK');
        this.newleaveEntitlement = new LeaveEntitlementPayload().clone();
        this.showLeaveYearModal = false;
        this.modificationStatus = false;
      } else {
        this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.FAILED, response.message, 'OK')
      }
      this.submitbtnPressed = false;
    }, (error) => {
      this.submitbtnPressed = false;
      if (error.status == 400) {
        this.alertservice.openCatchErrorModal(this.alertservice.ALERT_TYPES.FAILED, error.title, "Ok", error.errors);
      }
    });

  }
  showLeaveYearModal = false;
  getleaveEntitlement() {
    this.loading = true;
    this.LeaveEntitlementService.getLeaveEntitlements(this.filter.pageNumber, this.filter.pageSize)
      .subscribe(leaveEntitlement => {
        this.loading = false;
        this.modificationStatus = false;
        if (!leaveEntitlement.hasError) {
        
          this.LeaveEntitlement = leaveEntitlement.result;

          this.totalItems = leaveEntitlement.totalRecord;

        } else {

        }

      }, (error) => {
        console.log(error);
      }
      );
  }
  getGrades() {
    this.LeaveEntitlementService.getGrades().subscribe(data => {
      if (!data.hasError) {
        this.allGrades = data.result;
      }
    })
  }
  getLeaveTypes() {
    this.loading = true;
    this.GetLeaveTypesService.getLeaveTypes(this.leaveTypefilter.IsAnnualLeave, this.leaveTypefilter.MaxDays,
      this.leaveTypefilter.IsGradeDependent, this.leaveTypefilter.MinDays, this.leaveTypefilter.pageNumber, this.leaveTypefilter.pageSize)
      .subscribe(data => {
        if(!data.hasError)
        {        
          this.leaveTypeList = data.result;
         
        } else {
          
        }
      }, (error) => {
        console.log(error);
      })
}
  ngOnInit(): void {
    this.getGrades();
    this.getLeaveTypes();
    this.getleaveEntitlement();
  }

}
