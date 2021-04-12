import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IStatus,MyColor } from 'app/components/status/models';
import { ColumnTypes, TableActionEvent ,TableAction, ACTIONS} from 'app/components/tablecomponent/models';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { DataServiceProxy, DepartmentActivityDTO, ManpowerServiceProxy } from 'app/_services/service-proxies';

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
    {name: 'activityName', title: 'Activity Name',type: ColumnTypes.Text},
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
  createPlan() {
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
  ngOnInit(): void {
    this.getallCaplan();
  }

}
