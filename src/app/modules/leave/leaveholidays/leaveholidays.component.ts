import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  LeaveEntitlementPayload, LeaveEntitlementServiceProxy, LeaveEntitlementResource,
  Grade, GetLeaveTypesServiceProxy, AddUpdateHolidayServiceProxy, GetLeaveYearsServiceProxy, HolidayDatesServiceProxy, LeaveHolidayDTO, ManageLeaveHolidayDTO, DeleteServiceProxy
} from '../../../_services/service-proxies';
import { AlertserviceService } from '../../../_services/alertservice.service'
import { ColumnTypes, TableAction, TableActionEvent } from 'app/components/tablecomponent/models';




enum ACTIONS { EDIT = '1', DELETE = '2' }

@Component({
  selector: 'ngx-leaveholiday',
  templateUrl: './leaveholidays.component.html',
  styleUrls: ['./leaveholidays.component.scss']
})
export class LeaveenholidayComponent implements OnInit {
  pageName: string = "Leave Holiday";
  LeaveHolidays: LeaveHolidayDTO[] = [];
  LeaveYear = [];
  leaveHolidayForm: FormGroup;
  newleaveHolidays = new ManageLeaveHolidayDTO().clone();
  topActionButtons = [
    { name: 'add_holiday', label: 'Add Leave Holiday', 'icon': 'plus', outline: false },
  ];
  searchabletableColum = [
    { name: 'leaveYear', title: 'Year Name', type: ColumnTypes.Text },
    { name: 'description', title: 'Description', type: ColumnTypes.Text }
  ];
  tableColumns = [
    { name: 'holidayDate', title: 'Holiday Date', type: ColumnTypes.Date },
    { name: 'leaveYear', title: 'Leave Year', type: ColumnTypes.Text },
    { name: 'description', title: 'Description', type: ColumnTypes.Text },
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
  leaveYearfilter = {
    yearStartDate: null,
    yearName: null,
    yearEndDate: null,
    companyID: undefined,
    pageSize: 1000,
    pageNumber: 1
  }

  constructor(
    private AddUpdateHolidayService: AddUpdateHolidayServiceProxy,
    private HolidayDatesService: HolidayDatesServiceProxy,
    private GetLeaveYearServiceProxy: GetLeaveYearsServiceProxy,
    private alertservice: AlertserviceService,
    private DeleteService:DeleteServiceProxy
  ) { }


  tableActionClicked(event: TableActionEvent) {
    if (event.name == "1") {
      this.newleaveHolidays = event.data;
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
    this.getleaveHolidays();
  }
  get showEmpty() {
    return this.LeaveHolidays.length === 0;
  }
  modal(buttion) {
    if (buttion === 'add_holiday') {
      this.showLeaveYearModal = true;
      this.modificationStatus = false;
    }
  }


  deleteleaveYear(id) {
    this.DeleteService.deleteHolidayDate(id).subscribe(response => {
      if (!response.hasError) {
        this.getleaveHolidays();
        this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.SUCCESS, response.message, 'OK');
        this.newleaveHolidays = new ManageLeaveHolidayDTO().clone();
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
  createleaveHolidays() {
    this.submitbtnPressed = true;
    this.AddUpdateHolidayService.addUpdateHoliday(this.newleaveHolidays).subscribe((response) => {
      if (!response.hasError) {
        this.getleaveHolidays();
        this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.SUCCESS, response.message, 'OK');
        this.newleaveHolidays = new ManageLeaveHolidayDTO().clone();
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
  getleaveHolidays() {
    this.loading = true;
    this.HolidayDatesService.getHolidayDates(this.filter.pageNumber, this.filter.pageSize)
      .subscribe(leaveEntitlement => {
        this.loading = false;
        this.modificationStatus = false;
        if (!leaveEntitlement.hasError) {
        
          this.LeaveHolidays = leaveEntitlement.result;

          this.totalItems = leaveEntitlement.totalRecord;

        } else {

        }

      }, (error) => {
        console.log(error);
      }
      );
  }
  get validateStartdate() {
    if (this.newleaveHolidays.holidayDate) return true;
    return false;
  }
  getleaveYear() {
    this.loading = true;
    this.GetLeaveYearServiceProxy.getLeaveYears(this.leaveYearfilter.yearStartDate, this.leaveYearfilter.yearName,
      this.leaveYearfilter.yearEndDate, this.leaveYearfilter.companyID, this.leaveYearfilter.pageNumber, this.leaveYearfilter.pageSize)
      .subscribe(leaveyears => {
        this.loading = false;
        this.modificationStatus = false;
        if (!leaveyears.hasError) {
          this.LeaveYear = leaveyears.result;

        } else {

        }

      }, (error) => {
        console.log(error);
      }
      );
  }
  ngOnInit(): void {
    this.getleaveYear();
    this.getleaveHolidays();
    this.newleaveHolidays.holidayDate = new Date();
  }

}
