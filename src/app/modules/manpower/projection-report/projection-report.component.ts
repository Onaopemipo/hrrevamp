import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ACTIONS, ColumnTypes, TableAction, TableActionEvent } from 'app/components/tablecomponent/models';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { CustomServiceService } from 'app/_services/custom-service.service';
import { CommonServiceProxy, DataServiceProxy, DepartmentManPowerActivityDTO, DropdownValue, ManpowerServiceProxy } from 'app/_services/service-proxies';
enum TOP_ACTIONS {
  FILTER,
}
export interface searchQuery{
  jobCategory?: string,
  activityYear?: number,
  activityName?: string,
  departments?: any,
  status?: number,
  taskType?: number,
  taskProject?: string
  BaseYear?: any;
}
@Component({
  selector: 'ngx-projection-report',
  templateUrl: './projection-report.component.html',
  styleUrls: ['./projection-report.component.scss']
})
export class ProjectionReportComponent implements OnInit {
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
  jobRole = []

  JobPosition = [];
  DepartmentManPowerActivities: DepartmentManPowerActivityDTO[] = []
  DepartmentActivities = new DepartmentManPowerActivityDTO().clone();
  modificationStatus: boolean = false;
  showHRReviewModal: boolean = false;
  selectedCategory: string = "Job Role";
  constructor(public CustomService: CustomServiceService, private myDropdown: DataServiceProxy,private CommonService: CommonServiceProxy,
    private ManpowerService: ManpowerServiceProxy, private alertservice: AlertserviceService,) { }
    nulltasktype(){
      this.newQuery.taskType = 0;
    }
  
    get showEmpty() {
      return this.DepartmentManPowerActivities.length === 0;
    }
    tableActionClicked(event: TableActionEvent) {
      if (event.name == "1") {
        this.DepartmentActivities = event.data;
        this.showHRReviewModal = true;
        this.modificationStatus = true;
      }
      if (event.name == "3") {
  
      }
       }
 
  
  
  getRequirement(newQuery:searchQuery){
    this.loading = true;
    if(!this.baseYear){

    }else{
    //  console.log(newQuery);
    var mode = "";
      newQuery.BaseYear = this.baseYear;
      if(newQuery.jobCategory)mode = newQuery.jobCategory == "Job Role"?"jobrole":(newQuery.jobCategory == "Position"? "position":(newQuery.jobCategory == "Grade"? "grade" : ""))
      this.ManpowerService.fetchProjectionRequirment(this.baseYear, newQuery.activityYear, newQuery.activityName, newQuery.jobCategory,
        newQuery.departments, newQuery.status, newQuery.taskType, 1, 10).subscribe(data => {
          if (!data.hasError) {
            this.DepartmentManPowerActivities = data.result;
          }
        });
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
  
      this.ManpowerService.fetchProjectionTaskProject(tasktype,this.newQuery.activityYear,1,100).subscribe((result: any) => {
        
        this.alltasktype = result.data;      
       
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
    this.getJobRoles();
    this.getPositions();
    this.getdepartments();
    
    this.newQuery.jobCategory = "";
    this.newQuery.taskProject = "";
  }

}
