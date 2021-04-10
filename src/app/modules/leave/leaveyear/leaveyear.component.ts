import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PostServiceProxy, LeaveYearDTO, LeaveYearCreatePayload, CreateLeaveYearServiceProxy, GetLeaveYearServiceProxy, LeaveYearDTOApiResult, LeaveYearDTOListApiResult, GetLeaveYearsServiceProxy, DeleteServiceProxy } from '../../../_services/service-proxies';
import { AlertserviceService } from '../../../_services/alertservice.service'
import { NbDateService } from '@nebular/theme';
import { ColumnTypes, TableAction, TableActionEvent } from 'app/components/tablecomponent/models';
import { IStatus, MyColor } from 'app/components/status/models';

export class LeaveYearWithStatus extends LeaveYearDTO implements IStatus {
  leaveYear: LeaveYearDTO;

  constructor(leaveYear: LeaveYearDTO) {
    super(leaveYear);
    this.leaveYear = leaveYear;

  }
  get status() {
    return this.leaveYear.log_status;
  }
  getStatusLabel() {
    if (this.leaveYear.log_status === 0) return 'Pending';
    if (this.leaveYear.log_status === 1) return 'Approved';
    if (this.leaveYear.log_status === 2) return 'Rejected';

  }
  getStatusColor() {
    if (this.leaveYear.log_status === 0) return new MyColor(242, 153, 74);
    if (this.leaveYear.log_status === 1) return new MyColor(0, 153, 74);
    if (this.leaveYear.log_status === 2) return new MyColor(253, 238, 238);
    return new MyColor(242, 0, 74);
  }
}

enum ACTIONS { EDIT = '1', DELETE = '2' }

@Component({
  selector: 'ngx-leaveyear',
  templateUrl: './leaveyear.component.html',
  styleUrls: ['./leaveyear.component.scss']
})
export class LeaveyearComponent implements OnInit {
  pageName: string = "Leave Year";
  LeaveYear = [];
  leavYearForm: FormGroup;
  newleaveYear = new LeaveYearCreatePayload().clone();
  topActionButtons = [
    { name: 'add_leave_year', label: 'Add Leave Year', 'icon': 'plus', outline: false },
  ];

  tableColumns = [
    { name: 'yearName', title: 'Year Name', type: ColumnTypes.Text },
    { name: 'yearStartDate', title: 'Start Date', type: ColumnTypes.Date },
    { name: 'yearEndDate', title: 'End Date', type: ColumnTypes.Date },
    { name: 'isActive', title: 'Status', type: ColumnTypes.Status },
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
  constructor(private leaveYearService: PostServiceProxy,
    private DeleteService: DeleteServiceProxy,
    private GetLeaveYearServiceProxy: GetLeaveYearsServiceProxy,
    private CreateLeaveYearService: CreateLeaveYearServiceProxy,
    private alertservice: AlertserviceService,
    public dateService: NbDateService<Date>) { }


  tableActionClicked(event: TableActionEvent) {
    if (event.name == "1") {
      this.newleaveYear = event.data;
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
    this.getleaveYear();
  }
  get showEmpty() {
    return this.LeaveYear.length === 0;
  }
  modal(buttion) {
    if (buttion === 'add_leave_year') {
      this.showLeaveYearModal = true;
      this.modificationStatus = false;
    }
  }

  get validateStartdate() {
    if (this.newleaveYear.yearStartDate) return true;
    return false;
  }
  get validateEnddate() {
    if (this.newleaveYear.yearEndDate) return true;
    return false;
  }

  get formvalidate() {

    if (this.newleaveYear.yearName && this.newleaveYear.yearStartDate && this.newleaveYear.yearEndDate) return true;
    return false;
  }
  deleteleaveYear(id) {
    this.DeleteService.deleteLeaveYear(id).subscribe(response => {
      if (!response.hasError) {
        this.getleaveYear();
        this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.SUCCESS, response.message, 'OK');
        this.newleaveYear = new LeaveYearCreatePayload().clone();
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
    this.CreateLeaveYearService.createLeaveYear(this.newleaveYear).subscribe((response) => {
      if (!response.hasError) {
        this.getleaveYear();
        this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.SUCCESS, response.message, 'OK');
        this.newleaveYear = new LeaveYearCreatePayload().clone();
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
  getleaveYear() {
    this.loading = true;
    this.GetLeaveYearServiceProxy.getLeaveYears(this.filter.yearStartDate, this.filter.yearName, this.filter.yearEndDate, this.filter.companyID, this.filter.pageNumber, this.filter.pageSize)
      .subscribe(leaveyears => {
        this.loading = false;
        this.modificationStatus = false;
        if (!leaveyears.hasError) {
          var lvyr = leaveyears.result.map(lvyr => new LeaveYearWithStatus(lvyr));
          console.log(lvyr)
          this.LeaveYear = lvyr;

          this.totalItems = leaveyears.totalRecord;

        } else {

        }

      }, (error) => {
        console.log(error);
      }
      );
  }
  ngOnInit(): void {
    this.mindate = this.dateService.addYear(this.dateService.today(), -50);
    this.newleaveYear.yearStartDate = this.dateService.today();
    this.newleaveYear.yearEndDate = this.dateService.today();
    this.getleaveYear();


    // this.maxdate = this.dateService.addYear(this.newleaveYear.yearStartDate,1);
  }

}
