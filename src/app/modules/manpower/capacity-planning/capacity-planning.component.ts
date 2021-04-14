import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IStatus,MyColor } from '../../../components/status/models';
import { ColumnTypes, TableActionEvent ,TableAction, ACTIONS} from '../../../components/tablecomponent/models';
import { AlertserviceService } from '../../../_services/alertservice.service';
import { DataServiceProxy, DepartmentActivityDTO, ManpowerServiceProxy } from '../../../_services/service-proxies';
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
JobPosition = []
  constructor(private alertservice: AlertserviceService,private myDropdown: DataServiceProxy,private ManpowerService: ManpowerServiceProxy) { }

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
    if(jcat == "Job Role"){
this.JcategoryType = this.jobRole;
    }
    if(jcat == "Position"){
      this.JcategoryType=[];
      this.JobPosition.forEach(value=>{
        let newObj = {
          ID: value.ID,
          name: value.title
        }
        this.JcategoryType.push(newObj)
      });
          }
          if(jcat == "Grade"){
            this.JcategoryType = this.Jobgrade;
                }
  }
  ngOnInit(): void {
    this.getallCaplan();
    this.newcaplan.startDate = new Date();
    this.newcaplan.endDate = new Date();
  }

}
