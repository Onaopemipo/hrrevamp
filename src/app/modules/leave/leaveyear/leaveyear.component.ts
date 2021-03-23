import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PostServiceProxy, LeaveYearDTO, LeaveYearCreatePayload, GetLeaveYearServiceProxy, LeaveYearDTOApiResult, LeaveYearDTOListApiResult, GetLeaveYearsServiceProxy } from '../../../_services/service-proxies';
import { AlertserviceService } from '../../../_services/alertservice.service'
import { NbDateService } from '@nebular/theme';


@Component({
  selector: 'ngx-leaveyear',
  templateUrl: './leaveyear.component.html',
  styleUrls: ['./leaveyear.component.scss']
})
export class LeaveyearComponent implements OnInit {
  LeaveYear: LeaveYearDTO[]
  leavYearForm: FormGroup;
  newleaveYear = new LeaveYearCreatePayload().clone();
  topActionButtons = [
    { name: 'add_leave_year', label: 'Add Leave Year', 'icon': 'plus', outline: false },

  ];

  tableColumns = [
    { name: 'a', title: 'Year Name' },
    { name: 'b', title: 'Start Date' },
    { name: 'c', title: 'End Date' },
    { name: 'd', title: 'Status' },
  ];
  yearName: string = ''
  mindate: Date;
  maxdate: Date;




  submitbtnPressed: boolean = false;
  constructor(private leaveYearService: PostServiceProxy,
    private GetLeaveYearServiceProxy: GetLeaveYearsServiceProxy,
    private alertservice : AlertserviceService,
    public dateService: NbDateService<Date>) { }

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
    alert('hello')
    this.submitbtnPressed = true;
    this.leaveYearService.createLeaveYear(this.newleaveYear).subscribe(response => {
      if (response.hasError) {
        this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.FAILED, response.message, 'OK')
      }
    })
    this.submitbtnPressed = false
  }
  showLeaveYearModal = false;
  ngOnInit(): void {
    this.mindate = this.dateService.addYear(this.dateService.today(), -50);
    this.newleaveYear.yearStartDate = this.dateService.today();
    this.newleaveYear.yearEndDate = this.dateService.today();

    this.GetLeaveYearServiceProxy.getLeaveYears(null, null, null, 1).subscribe(leaveyears =>
      this.LeaveYear = leaveyears.result)

    // this.maxdate = this.dateService.addYear(this.newleaveYear.yearStartDate,1);
  }

}
