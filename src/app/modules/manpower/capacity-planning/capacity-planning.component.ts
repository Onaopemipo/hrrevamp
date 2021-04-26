import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IStatus,MyColor } from '../../../components/status/models';
import { ColumnTypes, TableActionEvent ,TableAction, ACTIONS} from '../../../components/tablecomponent/models';
import { AlertserviceService } from '../../../_services/alertservice.service';
import { CommonServiceProxy, DataServiceProxy, DepartmentActivityDTO, DepartmentManPowerActivityDTO, ManpowerServiceProxy } from '../../../_services/service-proxies';
import { CustomServiceService } from '../../../_services/custom-service.service';
import { Observable, forkJoin } from 'rxjs';
export interface planRequirement{
  ID?: number,
  jobCategory?: string,
  categorytypeName?: string,
  categoryType?: any,
  numberOfStaff?: number,
  costPerResource?: number
}

export class ActivityWithStatus extends DepartmentActivityDTO implements IStatus {
  activity: DepartmentActivityDTO;

  constructor(activity: DepartmentActivityDTO) {
    super(activity);
    this.activity = activity;

  }
  getStatusLabel() {
    if (this.activity.statusName == 'Pending') return 'Pending';
    if (this.activity.statusName ==  'Processed') return 'Processed';
    if (this.activity.statusName ==  'Completed') return 'Completed';

  }
  getStatusColor() {
    if (this.activity.statusName == 'Pending') return new MyColor(242, 153, 74);
    if (this.activity.statusName ==  'Processed') return new MyColor(0, 153, 74);
    if (this.activity.statusName ==  'Completed') return new MyColor(253, 238, 238);
    return new MyColor(242, 0, 74);
 }
 }
enum TOP_ACTIONS {
  ADD_PLAN,
}
@Component({
  selector: 'ngx-capacity-planning',
  templateUrl: './capacity-planning.component.html',
  styleUrls: ['./capacity-planning.component.scss']
})
export class CapacityPlanningComponent implements OnInit {
  caplanForm: FormGroup;
  pageName: string = 'Capacity Planning';
  topActionButtons = [
    {name: TOP_ACTIONS.ADD_PLAN, label: 'Add Plan', 'icon': 'plus', outline: false},

  ];
  showAddPlanModal: boolean = false;
  allCapacityPlan: DepartmentActivityDTO[] = []
  modificationStatus: boolean = false;
  newcaplan = new DepartmentActivityDTO().clone();
  filter = {
    jobCategory: "",
    taskProject: null,
    taskType: null,
    year: undefined,
    status: undefined,
    pageSize: 10,
    pageNumber: 1
  }
  loading: boolean = false;
  totalItems = 0;
  currentPage = 1;
  tableColumns = [
    {name: 'activityTypeName', title: 'Activity Name',type: ColumnTypes.Text},
    {name: 'activityTypeName', title: 'Task Type',type: ColumnTypes.Text},
    {name: 'description', title: 'Justification',type: ColumnTypes.Text},
    { name: 'requirements', title: 'Requirements', type: ColumnTypes.Object},
    { name: 'year', title: 'Calendar Year',type: ColumnTypes.Text },
    {name: 'statusName', title: 'Status',type: ColumnTypes.Status},
  ];
  tableActions: TableAction[] = [
    { name: ACTIONS.VIEW, label: 'View' },
    { name: ACTIONS.EDIT, label: 'Edit' },
  ];
  projecttask: boolean = false;
  todaysDate: Date;
  planrequirement: planRequirement = {};
  JcategoryType = [];
jobRole = []
Jobgrade =  []
  JobPosition = [];
  validCost: boolean = false;
  staffCostError = '';
  allreqPlan = [];
  addRequirementError = '';
  nextTenYears = [];
  endYear: any = "";
  startYear: any = "";
  submitRequirementError = "";
  constructor(private alertservice: AlertserviceService, private myDropdown: DataServiceProxy,
    private ManpowerService: ManpowerServiceProxy,private CommonService: CommonServiceProxy,public CustomService: CustomServiceService) { }

  get showEmpty() {
    return this.allCapacityPlan.length === 0;
  }
  tableActionClicked(event: TableActionEvent) {
    if (event.name == "1") {
      this.newcaplan = event.data;
      this.showAddPlanModal = true;
      this.modificationStatus = true;
    }
    if (event.name == "3") {

    }
     }
  filterUpdated(filter: any) {
    this.filter = {...this.filter, ...filter};
    this.getallCaplan();
  }
  modal(buttion) {
    if (buttion === TOP_ACTIONS.ADD_PLAN) {
     this.showAddPlanModal = true;

    }

  }
  get validateStartdate() {
    if (this.newcaplan.startDate) {return true;}
    return false;
  }
  get validateEnddate() {
    if (this.newcaplan.endDate) {return true;}
    return false;
  }
  createPlan() {
    this.newcaplan
    this.ManpowerService.addUpdateDepartmentActivity(this.newcaplan).subscribe(data => {
      
    })
  }
  getallCaplan() {
    this.loading = true;
    this.ManpowerService.getDepartmentActivity(this.filter.taskProject, this.filter.taskType, this.filter.year,
      this.filter.status, this.filter.pageNumber, this.filter.pageSize).subscribe(data => {
        this.loading = false;
        if (!data.hasError) {
          this.allCapacityPlan = data.result;
        } else {
          
        }
      })
  }
  
  getdate(event){
    var item = event.srcElement.value;
    this.projecttask =  item == 2 ? true: false;
    if(this.projecttask){
      this.todaysDate = new Date();
    }
    this.newcaplan.year = 0;
  }
  loadselected(event){
    var jcat = event.srcElement.value;
    if (jcat == "Job Role") {
      this.JcategoryType = [];
      this.jobRole.forEach(value => {
        let newObj = {
          ID: value.id,
          name: value.name
        }
        this.JcategoryType.push(newObj)
      })

    }
    if(jcat == "Position"){
      this.JcategoryType=[];
      this.JobPosition.forEach(value=>{
        let newObj = {
          ID: value.id,
          name: value.title
        }
        this.JcategoryType.push(newObj)
      });
          }
       
  }
  validatenumber(costvalue){
    var inputentry =  costvalue;
    var reg = new RegExp('^[0-9]+$');
    //console.log(reg.test(inputentry));
    if(inputentry && reg.test(inputentry) ){
      this.validCost = true;
      this.staffCostError = '';
    }else{
      this.validCost = false;
      this.staffCostError = 'Input Only Number';
  
   }
  }
  addrequirement(planrequirement){
    if(this.validCost){
    if(planrequirement.categoryType && planrequirement.jobCategory){

      var cJtypeName = this.JcategoryType[planrequirement.categoryType].name;
      var Jtype = this.JcategoryType[planrequirement.categoryType].ID;
      let obj = this.allreqPlan.find(x => x.cJtypeName.toLowerCase() === cJtypeName.toLowerCase());
      if (obj) {
        this.addRequirementError = `Error - ${cJtypeName} exist`;
      setTimeout(() => {
        this.addRequirementError = '';
      }, 3000);

      }else{
        var reqObj = {
          cJtypeName: cJtypeName,
          Ctype: planrequirement.jobCategory,
          Jtype: Jtype,
          Nstaff: planrequirement.numberOfStaff,
          RCost: planrequirement.costPerResource
        }

        this.allreqPlan.push(reqObj);
        

      }
    } else {
      this.addRequirementError = `Error - please select Job Category`;
      setTimeout(() => {
        this.addRequirementError = '';
      }, 3000);
   }
    } else {
      this.addRequirementError = `Please input valid Resource Cost - Numbers Only`;
      setTimeout(() => {
        this.addRequirementError = '';
      }, 3000);
  }
  }
  removerequirement(index){
    // 
    this.allreqPlan.splice(index,1);
    this.addRequirementError = `requirement removed`;
    setTimeout(() => {
      this.addRequirementError = '';
    }, 3000);


  }
  onDateSelection(date: Date){
    if(this.newcaplan.startDate){
       if(this.newcaplan.startDate.getFullYear() != date.getFullYear()){
this.startYear = this.newcaplan.startDate.getFullYear();
         this.endYear = date.getFullYear();
         let alertMsg = `Project End Year Spill Over to Another Year, Click Yes to set Project Year End to ${this.endYear} and No to set ${this.startYear} as Project Year`
this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.ANYCONFIRM, alertMsg, 'Yes').subscribe(data => {
  if (data == "closed") {
    this.newcaplan.year = this.endYear
  } else {
    this.newcaplan.year = this.startYear
  }

})
       }else{
        this.newcaplan.year = date.getFullYear();
       }

    }    
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
  submitnewplan(newplan: DepartmentActivityDTO, requirement) {
  
    if (this.allreqPlan.length > 0) {
      if (newplan.activityTypeId == 2) {
        if (!newplan.startDate || !newplan.endDate  || newplan.startDate == null || newplan.endDate == null) {
          this.submitRequirementError = `Error - please fill project start and project end date`;
          setTimeout(() => {
            this.addRequirementError = '';
          }, 3000);
         
          return false;
        }else{
          var startdate = new Date(newplan.startDate.getFullYear(),(newplan.startDate.getMonth())-1,(newplan.startDate.getDate())+1);
          var enddate = new Date(newplan.endDate.getFullYear(),(newplan.endDate.getMonth())-1,(newplan.endDate.getDay())+1);
  

        }
      }
      if (!newplan.year) {
        this.submitRequirementError = `Error - please select a valid year`;
        setTimeout(() => {
          this.addRequirementError = '';
        }, 3000);

          return false;
}
        newplan.requirements = [];
      var newplanrqmnt = [];
      
        requirement.forEach(value=>{
          var JobRoleId = value.Ctype == "Job Role"? value.Jtype: null;
          var PostionId = value.Ctype == "Position"? value.Jtype: null;
         if(JobRoleId){
           var newObj = new DepartmentManPowerActivityDTO().clone();
        
           newObj.jobCategoryName = value.Ctype;
           newObj.jobRoleId = JobRoleId;
           newObj.numberOfResource= value.Nstaff
           newObj.costPerResource= value.RCost
         
          newplan.requirements.push(newObj);
         }
          if (PostionId) {
           
          var PnewObj = new DepartmentManPowerActivityDTO().clone();
           PnewObj.jobCategoryName = value.Ctype;
           PnewObj.postionId = PostionId;
             PnewObj.numberOfResource = value.Nstaff;
           PnewObj.costPerResource = value.RCost;
          
          newplan.requirements.push(PnewObj);
         }
         console.log(newplan)

        });

       // newplan.planrequirement = newplanrqmnt;
      newplan.stringDepartmentManPowerActivity = JSON.stringify(newplan.requirements);
       this.loading = true;
        this.ManpowerService.addUpdateDepartmentActivity(newplan)
          .subscribe((result) => {
            this.loading = false;
       var respData = result;
          if (!respData.hasError) {   
            this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.SUCCESS, respData.message, 'OK');
        this.getallCaplan();
        this.newcaplan = new DepartmentActivityDTO().clone() ;
        this.planrequirement = {};
        this.allreqPlan = [];
        this.planrequirement.numberOfStaff = 0;
        this.newcaplan.status = 0;
      
      }else{
        this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.FAILED, respData.message, 'OK')     
          }
        }, (error) => {
          this.loading = false;
          if (error.status == 400) {
            this.alertservice.openCatchErrorModal(this.alertservice.ALERT_TYPES.FAILED, error.title, "Ok", error.errors);
          }
        });
   
    } else {
      this.submitRequirementError = `Please Add Requirements`;
      setTimeout(() => {
        this.addRequirementError = '';
      }, 3000);
        return false;
    }
  }

  ngOnInit(): void {
    this.planrequirement.numberOfStaff = 0;
    this.newcaplan.requirements = [];
    this.newcaplan.status = 0;   
    this.getallCaplan();
    this.getJobRoles();
    this.getPositions();
    this.CustomService.getnxttenyears();
    this.newcaplan.startDate = new Date();
    this.newcaplan.endDate = new Date();
  }

}
