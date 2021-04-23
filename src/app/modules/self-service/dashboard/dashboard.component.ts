import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/_services/authentication.service';
import { AddUpdateEventsServiceProxy,GetAllRequestServiceProxy, GetAllEventsServiceProxy, GetRequestByIdServiceProxy,EventDTO,RequestDTO, EmployeeContractAssignmentDTO, FetchEmployeeByIdServiceProxy, IVwUserObj } from '../../../_services/service-proxies'
import { EmployeeDTO } from '../../../_services/service-proxies'

const no_of_ms_in_a_day = 24 * 60 * 60 * 1000;

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  weekdays: Date[] = [];
  today = new Date();
  days_of_week = [
    'Mon', 'Tue', 'Wed', 'Thur', 'Fri'
  ];
  Request: RequestDTO[]=[];
  employeeDetails: EmployeeDTO;
  contract: EmployeeContractAssignmentDTO[] = [];
  employeeId: number = 1;
  PageSize?: number = 1000;
  pageNumber?: number = 1;
  departmentId? :number=1
  requestStatusId? :number=1
  log_status? :number=1
  requestTypeId? :number=1
 
  AllEvents: EventDTO[]
  constructor(private fetchemployeedetails: FetchEmployeeByIdServiceProxy, private request: GetRequestByIdServiceProxy, private authenService: AuthenticationService,
    private getevent:GetAllEventsServiceProxy, private getAll:GetAllRequestServiceProxy) { }

  //get employee record by id
  async getEmployeeDetails() {
    const data = await this.fetchemployeedetails.getEmployeeById(this.employeeId).toPromise()
    if (!data.hasError) {
      this.employeeDetails = data.result;
      this.contract = data.result.contracts
      console.log('employee', this.employeeDetails)
      // console.log('contract', this.contract)

    }
  }

  // get employee request and compliain by id

  async getRequest() {
    const data = await this.getAll.getAllRequest(this.pageNumber,this.log_status,this.PageSize,this.departmentId,this.requestTypeId,this.requestStatusId)
    .toPromise()

    if (!data.hasError) {
      this.Request = data.result;
      console.log('request', this.Request)
    }
  }
  getLoginUserDetails() {
    this.authenService.getuser().then((userData: IVwUserObj[]) => {
      if (userData.length > 0) {
        if (userData[0]) {
          this.employeeId = userData[0].employee_id;
        }
      }
    })
  }

  async getAllEvent(){
    const data = await this.getevent.getAllEvents(this.pageNumber,this.pageNumber).toPromise();
    console.log('datares',data.result)
    if(!data.hasError){
      this.AllEvents =data.result;
      console.log('all Events',this.AllEvents)
    }
  }
  ngOnInit(): void {
    this.getAllEvent()
    this.getRequest()
    this.getEmployeeDetails()
    this.getLoginUserDetails();
    const today = this.today;
    const day_of_week = today.getDay();
    const start_of_week = Number(today) - day_of_week * no_of_ms_in_a_day;
    const days = [];
    for (let day_no = 1; day_no <= 5; day_no++) {
      const day_in_ms = start_of_week + day_no * no_of_ms_in_a_day;
      const day = new Date(day_in_ms);
      days.push(day);
    }
    this.weekdays = days;
  }

}
