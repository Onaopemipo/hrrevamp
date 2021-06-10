import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbDateService } from '@nebular/theme';
import { AlertserviceService, ALERT_TYPES } from 'app/_services/alertservice.service';
import { CommonServiceProxy, CreateLeavePlanServiceProxy, GetLeaveTypesServiceProxy, GetLeaveYearsServiceProxy, LeavePlanDTO, LeavePlanResource, PostServiceProxy } from 'app/_services/service-proxies';


@Component({
  selector: 'ngx-createleave-plan',
  templateUrl: './createleave-plan.component.html',
  styleUrls: ['./createleave-plan.component.scss']
})
export class CreateleavePlanComponent implements OnInit {
  leavePlan: FormGroup;
  @Input() showModal: boolean = false;
  @Output() closed = new EventEmitter<boolean>();
  @Output() masterSearchOpened = new EventEmitter<boolean>();
  allowmultipleselection: boolean = false;
  selectionHeader: string = "Select Employee";
  addbtnText: string = "Add Employee";
  leaveD = new LeavePlanDTO().clone();
  allLeavetypes = [];
  allLeaveYears = [];
  LeaveData: LeavePlanResource[] = [];
  allLocation = [];
  noOfDaysError: string = '';
  btnSubmitted: boolean = false;
  masterSearchM = false;

  constructor(
    private PostServiceProxy: PostServiceProxy,
    public dateService: NbDateService<Date>,
    private CommonService: CommonServiceProxy,
    private GetLeaveYearsService: GetLeaveYearsServiceProxy,
    private GetLeaveTypesService: GetLeaveTypesServiceProxy,
    private alertService: AlertserviceService,
  private CreateLeavePlanService: CreateLeavePlanServiceProxy) { }

  masterSearchOpen() {  
    this.masterSearchM = !this.masterSearchM;
    this.showModal = ! this.showModal;
    this.closed.emit(true);
  }

  get disableSubmitbtn() {
    let resp: boolean = true;

    Object.entries(this.leaveD).map(([key, value], index) => {      
      if ((value == "" || value == null || value == undefined)) { 
        resp = false;
      }
    });
   // console.log(this.leaveD);
    return resp;
  }
  modalClosed(event) {
   // console.log(event)
    if (this.masterSearchM) {
      
    } else {
      this.closed.emit(false);
    }

  }
  createLeavePlan() {
    this.btnSubmitted = true;
    this.CreateLeavePlanService.createLeavePlan(this.leaveD).subscribe(resp=>{
      if (!resp.hasError) {
        this.alertService.openModalAlert(ALERT_TYPES.SUCCESS, "Leave Plan Created Successfully", "ok").subscribe(data => {
          this.leaveD = new LeavePlanDTO().clone();
          this.leaveD.startDate = new Date();
          this.leaveD.endDate = new Date();
         
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
    });
   }
 
  getallweekEndsbetweendate(startD: Date, endD: Date): number {
    console.log(startD,endD)
    var count = 0;
    var incr = this.dateDiffInDays(startD, endD);
    console.log(incr)
    for (var i = 0; i < incr; i++){
      var newD = this.addDays(startD, i);
      console.log(newD)
      var iswkend = this.getweekEnds(newD);
      if (iswkend){ count++;console.log(newD)}
    }
    console.log(count)
    return count;
  }
  
   getweekEnds(res: Date):boolean {
     if(res.getDay() == 6 || res.getDay() == 0)return true;
     return false;
   }
   getweekvalue(res: Date):number {
     if (res.getDay() == 6) { return 2 };
     if(res.getDay() == 0){return 1}
    return 0;
  }
   dateDiffInDays(a: Date, b:Date):number {
     const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
 
  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
   }
   
  processStartEndNoofDays() {
     console.log(this.leaveD.startDate)
  //  this.noOfDaysError = "Please Enter Number of Days";
    if (this.validateStartdate) {
      if ((this.validateStartdate && this.validateEnddate) || (this.validateStartdate && this.leaveD.noOfDays > 0)) {
        console.log('am here')
        this.noOfDaysValidation();
        this.noOfDaysError = '';
      }

    }
  
   }
  addDays(date, days):Date {
    var result = new Date(date); 
    var adddate = parseInt(String(result.getDate())) + parseInt(days);
     result.setDate(adddate);
     return result;
   }
   noOfDaysValidation() {
     let result: Date = new Date();
     if (this.leaveD.noOfDays && this.validateEnddate)
     {
      var eEndDt = this.addDays(this.leaveD.startDate, this.leaveD.noOfDays);
      var val = this.getweekvalue(eEndDt);
      var nendDat = this.addDays(eEndDt, val);
      var is_weekend = this.getallweekEndsbetweendate(this.leaveD.startDate, nendDat);
      this.leaveD.endDate = is_weekend > 0 ? this.addDays(nendDat, is_weekend) : nendDat;
      return;
       
       }
     if (this.leaveD.noOfDays) {     
       var eEndDt = this.addDays(this.leaveD.startDate, this.leaveD.noOfDays);
       var val = this.getweekvalue(eEndDt);
       var dDateRedby = val == 1 ? -2 : (val == 2 ? -1 : 0);
       console.log(eEndDt, dDateRedby)
       eEndDt = dDateRedby != 0 ? this.addDays(eEndDt, dDateRedby) : eEndDt;
       var is_weekend = this.getallweekEndsbetweendate(this.leaveD.startDate, eEndDt);
       console.log(eEndDt)
   
       console.log(val)
       var nendDat = this.addDays(eEndDt, (val + is_weekend));
       console.log(nendDat)
       this.leaveD.endDate = nendDat;
       return;
     }
     if (this.validateEnddate) {
       var daysdiff = this.dateDiffInDays(this.leaveD.startDate, this.leaveD.endDate);
       this.leaveD.noOfDays = daysdiff;
       var val = this.getweekvalue(this.leaveD.endDate);
       var nendDat = this.addDays(this.leaveD.startDate, val);
       var is_weekend = this.getallweekEndsbetweendate(this.leaveD.startDate, nendDat);
       this.leaveD.endDate = is_weekend > 0 ? this.addDays(nendDat, is_weekend) : nendDat;
       return;
     }
   }
 
 get validateStartdate() {
   if (this.leaveD.startDate) {return true;}
   return false;
 }
 get validateEnddate() {
   if (this.leaveD.endDate) {return true;}
   return false;
 }
 getAllLocation() {
   this.CommonService.getLocations().subscribe(res => {
     if (!res.hasError) {
       this.allLocation = res.result;
 }
   })
 }
  
  
   
   getAllLeaveType() {
     this.GetLeaveTypesService.getLeaveTypes(undefined, null, undefined, null,1,100).subscribe(res => {
       if (!res.hasError) {
         this.allLeavetypes = res.result;
       }
     })
   }
   getAllLeaveYear() {
     this.GetLeaveYearsService.getLeaveYears(undefined,null,undefined,undefined,1,100).subscribe(res => {
       if (!res.hasError) {
         this.allLeaveYears = res.result;
       }
     })
   }
 
   getSelectedEmployee(event) {
    //console.log(event)
    this.leaveD.employeeContractId = event[0].employeeContractId;
  }
  ngOnInit(): void {
 //   console.log(this.showModal);
    this.getAllLocation();
    this.getAllLeaveType();
    this.getAllLeaveYear();
    // this.leaveD.startDate = new Date();
    // this.leaveD.endDate = new Date();
  }

}
