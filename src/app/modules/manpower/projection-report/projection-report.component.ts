import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IStatus, MyColor } from 'app/components/status/models';
import { ACTIONS, ColumnTypes, TableAction, TableActionEvent } from 'app/components/tablecomponent/models';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { CustomServiceService } from 'app/_services/custom-service.service';
import { CommonServiceProxy, DataServiceProxy, ProjectionReportDTO, DropdownValue, ManpowerServiceProxy } from 'app/_services/service-proxies';
import { projectionReport, searchQuery } from '../manpower.model';
import { NbPopoverDirective } from '@nebular/theme';
import { DecimalPipe} from '@angular/common';
export class extendedProjectPlan  extends ProjectionReportDTO implements IStatus {
  pPlan: ProjectionReportDTO;
  baseYear: number;
  activityYear: number;
  costImplication: any;
  employCount: number;
  newincreamnet: any;
  baseYearCostperEmpl: any;
  
  constructor(pPlan : ProjectionReportDTO) {
    super(pPlan);
    this.pPlan = pPlan;

  }
  getStatusLabel() {

    if (this.pPlan.increament > 0 && this.pPlan.increament != 0.5) return 'Upward';
    if (this.pPlan.increament < 0 ) return 'Downward';

  }
  getStatusColor() {
    if (this.pPlan.increament > 0 && this.pPlan.increament != 0.5) return new MyColor(0, 153, 74);
    if (this.pPlan.increament < 0 ) return new MyColor(242, 0, 74);
    return new MyColor(253, 238, 238);
  }
}
enum TOP_ACTIONS {
  FILTER,
}

@Component({
  selector: 'ngx-projection-report',
  templateUrl: './projection-report.component.html',
  styleUrls: ['./projection-report.component.scss']
})
export class ProjectionReportComponent implements OnInit {
  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;
  filterReportForm: FormGroup;
  pageName: string = 'Projection Report';
  topActionButtons = [
    {name: TOP_ACTIONS.FILTER, label: 'Filter Report', 'icon': '', outline: false},
  ];
  showFilterModal: boolean = false;
  loading: boolean = false;
  newQuery: searchQuery = {};
  alldepartments: DropdownValue[] = [];
  baseYear: number;
  alltasktype = [];
  totalItems = 0;
  currentPage = 1;
  showActions = true;
  showCheckBox = false;
  pageSize = 10;
  COLUMN_TYPES = ColumnTypes;
  tableColumns = [
    {name: 'deptmntName', title: 'Department Name',type: ColumnTypes.Text},
    {name: 'allroles', title: 'Role(s)',type: ColumnTypes.Object},
    {name: 'baseYear', title: 'Base Year',type: ColumnTypes.Text},
    { name: 'allbaseYearCount', title: 'Base Year Employee Count', type: ColumnTypes.Text},
    { name: 'baseYearCostperEmpl', title: 'Base Year Cost Per Employee',type: ColumnTypes.Text},
    { name: 'roleCost', title: 'Base Year Employee Cost', type: ColumnTypes.Text },
    { name: 'activityYear', title: 'Projection Year', type: ColumnTypes.Text },
    {name: 'jobRoleCount', title: 'Projection Year Employee Count',type: ColumnTypes.Text},
    {name: 'employeeRoleCost', title: 'Projection Year Employee Cost',type: ColumnTypes.Number},
    { name: 'approvedJobRoleCount', title: 'Approved Resource', type: ColumnTypes.Text},
    { name: 'newincreamnet', title: '% Change',type: ColumnTypes.Text },
    { name: 'increament', title: 'Cost Implication', type: ColumnTypes.Status },
    {name: 'employCount', title: 'Total Employee Count',type: ColumnTypes.Text},
  ];

  tableActions: TableAction[] = [
    { name: ACTIONS.VIEW, label: 'View' },
    { name: ACTIONS.EDIT, label: 'Take Action' },
  ];
  jobRole = []

  JobPosition = [];
  DepartmentManPowerActivities: extendedProjectPlan[] = []
  DepartmentActivities = new ProjectionReportDTO().clone();
  modificationStatus: boolean = false;
  showHRReviewModal: boolean = false;
  selectedCategory: string = "Job Role";
  projectionplan: projectionReport = {};
  departmentRequirements = [];
objrequirement: projectionReport = {};
newHRrequirement = [];
submitRequirement = [];
unlockDecision: string = "";
  unlockComment: string = "";
  decisionCol = "";
  constructor(
    private dPipe: DecimalPipe,
    public CustomService: CustomServiceService, private myDropdown: DataServiceProxy, private CommonService: CommonServiceProxy,
    private ManpowerService: ManpowerServiceProxy, private alertservice: AlertserviceService,) { }
    nulltasktype(){
      this.newQuery.taskType = 0;
    }
  
    get showEmpty() {
      return this.DepartmentManPowerActivities.length === 0;
  }
  tableActionChecked(i,data) {

  }
  pageClicked(pageNo: number) {

  }
  tableActionClicked(event, data) {
    this.popover.hide();
    if (event == "action") {
        this.DepartmentActivities = data;
        this.showHRReviewModal = true;
        this.modificationStatus = true;
      }
      if (event == "view") {
        this.DepartmentActivities = data;
        this.showHRReviewModal = true;
       // this.modificationStatus = true;
      }
       }
 
       setcomment(event,requiremnt){
        this.newHRrequirement = this.DepartmentActivities.newRequirement;
        var inputentry = event.srcElement.value;
        if(inputentry){
         var n = this.newHRrequirement.findIndex(x => x.ID == requiremnt.ID);
         this.DepartmentActivities.newRequirement[n].hrComment= inputentry;
        // console.log(this.projectionplan.newRequirement[n])
        }
      }
  
  getRequirement(newQuery:searchQuery){
    this.loading = true;
    if (!this.baseYear) {
      this.loading = false;
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.FAILED, "Please select a base year", 'OK');
    }else{
    //  console.log(newQuery);
    var mode = "";
      newQuery.BaseYear = this.baseYear;
      if (newQuery.jobCategory) mode = newQuery.jobCategory == "Job Role" ? "jobrole" : (newQuery.jobCategory == "Position" ? "position" : (newQuery.jobCategory == "Grade" ? "grade" : ""))

      this.ManpowerService.fetchProjectionRequirment(this.baseYear, newQuery.activityYear, newQuery.activityName, newQuery.jobCategory,
        newQuery.departments, newQuery.status, newQuery.taskType, 1, 10).subscribe(data => {
          this.loading = false;
          if (!data.hasError) {
            this.DepartmentManPowerActivities = data.result.map(p=>new extendedProjectPlan(p));
            this.totalItems = data.totalRecord;
            this.DepartmentManPowerActivities.map(r => {

              r.baseYear = this.newQuery.BaseYear;
              r.activityYear = this.newQuery.activityYear;
              r.employCount = r.allbaseYearCount + r.approvedJobRoleCount;
             
              r.newincreamnet = ((isFinite(r.increament) == false)) ? "N/A" : (r.increament == 0? " - ": (r.increament > 0 || r.increament < 0)? this.getincreamentPerc(r.increament) + " %": "N/A") ;
              if (r.jobRoleName) {
                r.baseYearCostperEmpl = r.baseyrPerRoleCost;
            // var roleDetails = this.newbaseyear.find(njr => njr.ItemName === r.JobRoleName);
         // r.allbaseYearCount = r.allbaseYearCount;
         // r.baseyrPerRoleCost = roleDetails.AmountPerItem;
        //  r.roleCost = r.roleCost;
          //var increament = (((r.EmployeeRoleCost * r.JobRoleCount) - (roleDetails.EmployeeCount * roleDetails.AmountPerItem)) / (roleDetails.EmployeeCount * roleDetails.AmountPerItem)) * 100;
         // r.increament = r.increament;
          }
              if(r.allroles){
                r.allroles.forEach(value=>{
               //   var roleDetails = this.newbaseyear.find(njr => njr.ItemName === value.roleName);
                //  r.allbaseYearCount = r.allbaseYearCount;                
                  r.baseYearCostperEmpl = "N/A";
                 // r.roleCost = (roleDetails.EmployeeCount * roleDetails.AmountPerItem) + r.roleCost;
                })
             //   var increament = (((r.EmployeeRoleCost * r.JobRoleCount) - (r.RoleCost)) / (r.RoleCost)) * 100;
              //  r.increament = r.increament;
              }
              
              return r;
                  });
            this.showFilterModal = false;
          }
        });
    }

  }
  getincreamentPerc(incrNumber) {
    var rs = this.dPipe.transform(incrNumber, '.2');
    return rs;
  }
  submitrequirement(requirement:ProjectionReportDTO){
    var checkval= [];
   // console.log(requirement);
   var requmnt = requirement.newRequirement;
   requmnt.forEach(req=>{
      if(req.hrComment == "" || req.decision == "" || (req.approvedResource == null && req.approvedResource != 0) || req.hrComment == null || req.decision == null || (req.approvedResource == null && req.approvedResource != 0 )){
        checkval.push(false);
      }else{
        //console.log('true', req);
        checkval.push(true);
      }  
    });
    var err = checkval.indexOf(false);

    if (err != -1) {
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.FAILED, "please fill: Approved Resource, Decision and Comment for all Resource", "ok");

     
    }else{
      requmnt.forEach(value=>{
        this.submitRequirement.push(value);
      });
this.submitHR();

    //console.log(requirement);
}
  }
  submitHR() {
    this.loading = true;
    var reqObj = JSON.stringify(this.submitRequirement)
    this.ManpowerService.submitRequirmentReview(reqObj).subscribe(data => {
      this.loading = false;
      if (!data.hasError) {
        this.showHRReviewModal = false;       
        this.submitRequirement = [];
       this.getRequirement(this.newQuery);
       this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.SUCCESS, data.message, "ok");
         
       }else{    
         this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.FAILED, data.message, "ok");  
       }
    });    
    
  }
    setdecision(event,requiremnt){
      this.newHRrequirement = this.DepartmentActivities.newRequirement;
      var inputentry = event.srcElement.value;
      if(inputentry){     
       var n = this.newHRrequirement.findIndex(x => x.ID == requiremnt.ID);
       this.DepartmentActivities.newRequirement[n].decision= inputentry;
      // console.log(this.projectionplan.newRequirement[n])
      }else{
        this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.FAILED, "Please Select Decision", "ok");

      }
  }
  compareyearlycost(event)
{
var sYear = event.srcElement.value;
this.baseYear= sYear;
if(sYear != "" || sYear != null)
{

}
    }
  setApprovedResource(event, requiremnt){
    this.newHRrequirement = this.DepartmentActivities.newRequirement;
    var inputentry =  event.target.value;
    var reg = new RegExp('^[0-9]+$');
    //console.log(reg.test(inputentry));
    if(inputentry && reg.test(inputentry) ){
     var n = this.newHRrequirement.findIndex(x => x.ID == requiremnt.ID);
     this.DepartmentActivities.newRequirement[n].approvedResource= inputentry;
   //console.log(this.projectionplan.newRequirement[n])
    }else{
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.FAILED, "Input Number Only", "ok");
   }
       }
  modal(buttion) {
    if (buttion === TOP_ACTIONS.FILTER) {
     this.showFilterModal = true;

    }

  }
  getTaskCategorytype(event){
    var tasktype = event.srcElement.value;
    if(this.newQuery.activityYear){
  
      this.ManpowerService.fetchProjectionTaskProject(tasktype,this.newQuery.activityYear,1,100).subscribe((result) => {
        
        this.alltasktype = result.result;       
        if(result.message === 'Unauthorized Request'){
       
        }else{
         
          console.log('tasktype: ', this.alltasktype );
        }
       
      },error => {
     
        console.log('Error Getting tasktype: ', error);
      })

    }else{
        this.newQuery.taskType = 0;
    }
     
  }
  updateJobCategoty(event){
    this.selectedCategory = event.srcElement.value;
        }
  getdepartments() {
    this.myDropdown.getDropDownValuesById(2).subscribe(data => {
      if(!data.hasError){
         this.alldepartments = data.result;
      }
      else {
        console.log('There was an error')
      }
    })
  }
  getJobRoles() {
    this.CommonService.getJobRoles().subscribe(data => {
      if (!data.hasError) {
        this.jobRole = data.result;
      }else{}
      
    })
  }

  getPositions() {

    this.CommonService.getPositions().subscribe(data => {
      if (!data.hasError) {
        this.JobPosition = data.result;
      }else{}
      
    })
  }
  ngOnInit(): void {
    this.DepartmentActivities.newRequirement = [];
    this.getJobRoles();
    this.getPositions();
    this.getdepartments();
    this.CustomService.getnxttenyears();
    this.CustomService.getprevtenyears();
    this.projectionplan.newRequirement = [];
    this.newQuery.jobCategory = "";
    this.newQuery.taskProject = "";
  }

}
