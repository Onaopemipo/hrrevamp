import { Component, Input, OnInit } from '@angular/core';
import { NbDateService } from '@nebular/theme';
import { AlertserviceService, ALERT_TYPES } from 'app/_services/alertservice.service';
import { CommonServiceProxy, CreateLeaveByAdminServiceProxy, GetLeaveTypesServiceProxy, GetLeaveYearsServiceProxy, ManageLeaveRequestDTO, PostServiceProxy } from 'app/_services/service-proxies';

@Component({
  selector: 'ngx-createleave-request',
  templateUrl: './createleave-request.component.html',
  styleUrls: ['./createleave-request.component.scss']
})
export class CreateleaveRequestComponent implements OnInit {
  @Input() showModalRequest: boolean = false;

  allowmultipleselection: boolean = false;
  selectionHeader: string = "Select Employee";
  addbtnText: string = "Add Employee";
  allLeavetypes = [];
  allLeaveYears = [];
  noOfDaysError: string = '';
  leaveReq = new ManageLeaveRequestDTO().clone();
  btnSubmitted: boolean = false;
  constructor(
    private PostServiceProxy: PostServiceProxy,
    public dateService: NbDateService<Date>,
    private CommonService: CommonServiceProxy,
    private GetLeaveYearsService: GetLeaveYearsServiceProxy,
    private GetLeaveTypesService: GetLeaveTypesServiceProxy,
    private alertService: AlertserviceService,
    private CreateLeaveByAdminService: CreateLeaveByAdminServiceProxy) { }

  
  createLeaveRequest() {
    this.btnSubmitted = true;
      this.CreateLeaveByAdminService.createLeaveByAdmin(this.leaveReq).subscribe(resp => {
        if (!resp.hasError) {
          this.alertService.openModalAlert(ALERT_TYPES.SUCCESS, resp.message, "ok").subscribe(data => {
            this.leaveReq = new ManageLeaveRequestDTO().clone();
            this.leaveReq.startDate = new Date();
          });
          
        } else {
          this.alertService.openModalAlert(ALERT_TYPES.FAILED, resp.message, "Ok").subscribe(data => {
   
           });
        }
        this.btnSubmitted = false;
      }, (error) => {
        this.btnSubmitted = false;
        if (error.status == 400) {
          this.alertService.openCatchErrorModal(ALERT_TYPES.FAILED, error.title, "Ok", error.errors);
        }
      })
    }
  
    get disableApplyLeave() {
      let resp: boolean = true;
      Object.entries(this.leaveReq).map(([key, value], index) => {      
        if ((value == "" || value == null || value == undefined) && key != 'file') { 
          resp = false;
        }
      });
      
      return resp;
    }
    getAllLeaveType() {
      this.GetLeaveTypesService.getLeaveTypes(true, 0, false, 0,1,10).subscribe(res => {
        if (!res.hasError) {
          this.allLeavetypes = res.result;
        }
      })
    }
    getAllLeaveYear() {
      this.GetLeaveYearsService.getLeaveYears(new Date('01/01/2000'),'',new Date(),0,1,10).subscribe(res => {
        if (!res.hasError) {
          this.allLeaveYears = res.result;
        }
      })
    }
    get validateStartdate() {
      if (this.leaveReq.startDate) {return true;}
      return false;
    }
    getSelectedEmployee(event,selectType) {
     //console.log(event)
      if(selectType == 'employee')this.leaveReq.employeeNumber = event.employeeContractId;
      if(selectType == 'relief')this.leaveReq.reliefOfficerStaffNo = event.employeeContractId;
   }
  ngOnInit(): void {
    this.getAllLeaveType();
    this.getAllLeaveYear();
    this.leaveReq.startDate = new Date();
  }

}
