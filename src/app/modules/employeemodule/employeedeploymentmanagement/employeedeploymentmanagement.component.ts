import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ACTIONS, ColumnTypes, TableAction, TableActionEvent } from 'app/components/tablecomponent/models';
import { EmployeeDeploymentServiceProxy, CreateDeploymentViewModel, FetchDeploymentServiceProxy, DeploymentLog, DeploymentLogDTO } from '../../../_services/service-proxies';
import { IStatus, MyColor } from 'app/components/status/models';
export class deploymentWithStatus extends DeploymentLogDTO implements IStatus {
  deploymnt: DeploymentLogDTO;

  constructor(deploymnt: DeploymentLogDTO) {
    super(deploymnt);
    this.deploymnt = deploymnt;

  }
  get status() {
    return this.deploymnt.log_status;
  }
  getStatusLabel() {
    if (this.deploymnt.log_status === 0) return 'Due';
    if (this.deploymnt.log_status === 1) return 'Pending';
    if (this.deploymnt.log_status === 2) return 'Approved';
    if (this.deploymnt.log_status === 3) return 'Declined';
  }
  getStatusColor() {
    if (this.deploymnt.log_status === 0) return new MyColor(242, 153, 74);
    if (this.deploymnt.log_status === 1) return new MyColor(0, 153, 74);
    if (this.deploymnt.log_status === 2) return new MyColor(253, 238, 238);
    return new MyColor(242, 0, 74);
  }
}

enum TOP_ACTIONS {
  
  BATCH_DEPLOYMENT
}

@Component({
  selector: 'ngx-employeedeploymentmanagement',
  templateUrl: './employeedeploymentmanagement.component.html',
  styleUrls: ['./employeedeploymentmanagement.component.scss']
})
export class EmployeedeploymentmanagementComponent implements OnInit {

  tableColumns = [
    { name: 'employeeName', title: 'EMPLOYEE' },
    { name: 'staffNumber', title: 'STAFF NO' },
    { name: 'appointmentDate', title: 'APPOINTMENT DATE' ,type: ColumnTypes.Date},
    { name: 'request_by', title: 'REQUESTED BY' },
    { name: 'log_status', title: 'REQUESTED STATUS', type: ColumnTypes.Status },
  ];

  tableActions: TableAction[] = [
    { name: ACTIONS.VIEW, label: 'View' },
  ];

  data: CreateDeploymentViewModel[] = []
  filter = {
    CompanyID: undefined,
    SubID: undefined,
    employeeContractid: undefined,
    Name: null,
    ID: undefined,
    strStartDate: undefined,
    strEndDate: undefined,
    ReferenceId: undefined,
    Code: null,
    pageNumber: 1,
    pageSize: 10

  }
  allDeployment= [];
  loading: boolean = false;
  totalItems = 0;
  currentPage = 1;

  constructor(private EmployeeDeploymentServiceProxy: EmployeeDeploymentServiceProxy,
    private router: Router,private FetchDeploymentService: FetchDeploymentServiceProxy) { }

  
  tableActionClicked(event: TableActionEvent) {
    if (event.name == "3") {
  this.router.navigate(['/employeemodule/deploymentview'],{queryParams:{data:JSON.stringify(event.data)}})
    }

  }
  filterUpdated(filter: any) {
    this.filter = { ...this.filter, ...filter };
    this.getallDeploymentRequest();
  }
  get showEmpty() {
    return this.allDeployment.length === 0;
  }

  ngOnInit(): void {
    this.getallDeploymentRequest();
  }
  getallDeploymentRequest() {
    this.loading = true;
    this.FetchDeploymentService.fetchDeployment(this.filter.CompanyID, this.filter.SubID, this.filter.employeeContractid,
      this.filter.Name, this.filter.ID, this.filter.strStartDate, this.filter.strEndDate, this.filter.ReferenceId, this.filter.Code,
    this.filter.pageNumber,this.filter.pageSize).toPromise().then(
      (deployment) => {
        var lvyr = deployment.result.map(lvyr => new deploymentWithStatus(lvyr));
        this.allDeployment = lvyr;
        this.loading = false;
      }
      
    )
}
  getuploadedfile(event){
    console.log('event')
  }
  filtertabConf(is_approved = []) {   
    let tabtittle = "";
    is_approved.forEach(value => {
      if (value.activeValue) tabtittle = value.tabTitle;
    });
   // console.log(tabtittle);
    this.filter.Code = tabtittle == 'Due' ? 0 :
      (tabtittle == 'Pending' ? 1 : (tabtittle == 'Approved' ? 2 : (tabtittle == 'Declined' ? 3 : 4)));
    this.getallDeploymentRequest();
  }
}
