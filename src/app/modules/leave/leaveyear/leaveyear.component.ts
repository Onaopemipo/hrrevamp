import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PostServiceProxy, LeaveYearDTO, LeaveYearCreatePayload, GetLeaveYearServiceProxy, LeaveYearDTOApiResult, LeaveYearDTOListApiResult, GetLeaveYearsServiceProxy } from '../../../_services/service-proxies';
import { AlertserviceService } from '../../../_services/alertservice.service'
import { NbDateService } from '@nebular/theme';
import { ColumnTypes,TableAction, TableActionEvent } from 'app/components/tablecomponent/models';
enum ACTIONS { EDIT = '1', DELETE = '2' }

@Component({
  selector: 'ngx-leaveyear',
  templateUrl: './leaveyear.component.html',
  styleUrls: ['./leaveyear.component.scss']
})
export class LeaveyearComponent implements OnInit {
  pageName: string = "Leave Year";
  LeaveYear: LeaveYearDTO[] = [];
  leavYearForm: FormGroup;
  newleaveYear = new LeaveYearCreatePayload().clone();
  topActionButtons = [
    { name: 'add_leave_year', label: 'Add Leave Year', 'icon': 'plus', outline: false },
  ];

  tableColumns = [
    { name: 'yearName', title: 'Year Name', type: ColumnTypes.Text },
    { name: 'yearStartDate', title: 'Start Date', type: ColumnTypes.Date},
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
  }

  totalItems = 0;
  currentPage = 0;

  submitbtnPressed: boolean = false;
  loading: boolean = false;
  constructor(private leaveYearService: PostServiceProxy,
    private GetLeaveYearServiceProxy: GetLeaveYearsServiceProxy,
    private alertservice : AlertserviceService,
    public dateService: NbDateService<Date>) { }
  
    tableActionClicked(event: TableActionEvent) { }
  filterUpdated(filter: any) {
    this.filter = {...this.filter, ...filter};
    this.getleaveYear();
  }
  get showEmpty() {
    return this.LeaveYear.length === 0;
  }
  modal(buttion) {
    if (buttion === 'add_leave_year') {
      this.showLeaveYearModal = true;

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
  createleaveYear() {
    this.submitbtnPressed = true;
    this.leaveYearService.createLeaveYear(this.newleaveYear).subscribe(response => {
      if (response.hasError) {
        this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.FAILED, response.message, 'OK')
      }
    })
    this.submitbtnPressed = false
  }
  showLeaveYearModal = false;
  getleaveYear() {
    this.loading = true;
    this.GetLeaveYearServiceProxy.getLeaveYears(this.filter.yearStartDate, this.filter.yearName, this.filter.yearEndDate, this.filter.companyID)
      .subscribe(leaveyears => {
        this.loading = false;
        if(!leaveyears.hasError)
        {
          this.LeaveYear = leaveyears.result;
          this.totalItems = leaveyears.totalCount;
        } else {
          
        }

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
