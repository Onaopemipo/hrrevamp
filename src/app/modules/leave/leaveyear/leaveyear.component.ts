import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PostServiceProxy, LeaveYearCreatePayload, GetLeaveYearServiceProxy } from '../../../_services/service-proxies';
import { NbDateService } from '@nebular/theme';

@Component({
  selector: 'ngx-leaveyear',
  templateUrl: './leaveyear.component.html',
  styleUrls: ['./leaveyear.component.scss']
})
export class LeaveyearComponent implements OnInit {
  LeaveYear: string = 'Leave Year';
  leavYearForm: FormGroup;
  newleaveYear = new LeaveYearCreatePayload().clone();
  topActionButtons = [
    {name: 'add_leave_year', label: 'Add Leave Year', 'icon': 'plus', outline: false},

  ];

  tableColumns = [
    {name: 'a', title: 'Year Name'},
    {name: 'b', title: 'Start Date'},
    {name: 'c', title: 'End Date'},
    {name: 'd', title: 'Status'},
  ];
  mindate: Date;
  maxdate: Date;
  submitbtnPressed: boolean = false;
  constructor(private leaveYearService: PostServiceProxy,
    private GetLeaveYearServiceProxy: GetLeaveYearServiceProxy,
    public dateService: NbDateService<Date>) { }
  modal(buttion) {
    if (buttion === 'add_leave_year') {
     this.showLeaveYearModal = true;

    }

  }

  getleaveYear() {
  
  }
  createleaveYear() {
    this.submitbtnPressed = true;
  }
  showLeaveYearModal = false;
  ngOnInit(): void {
    this.mindate = this.dateService.addYear(this.dateService.today(),-50);
    this.newleaveYear.yearStartDate = this.dateService.today();
    this.newleaveYear.yearEndDate = this.dateService.today();
    // this.maxdate = this.dateService.addYear(this.newleaveYear.yearStartDate,1);
  }

}
