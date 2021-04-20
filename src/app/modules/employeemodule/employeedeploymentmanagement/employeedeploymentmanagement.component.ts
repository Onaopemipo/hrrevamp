import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ACTIONS, TableAction, TableActionEvent } from 'app/components/tablecomponent/models';
import { EmployeeDeploymentServiceProxy, CreateDeploymentViewModel } from '../../../_services/service-proxies';


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
    { name: 'a', title: 'S/N' },
    { name: 'b', title: 'EMPLOYEE' },
    { name: 'refNo', title: 'STAFF NO' },
    { name: 'effective_date', title: 'APPOINTMENT DATE' },
    { name: 'e', title: 'PROBATION PERIOD' },
    { name: 'request_by', title: 'REQUESTED BY' },
    { name: 'log_status', title: 'REQUESTED STATUS' },
  ];

  tableActions: TableAction[] = [
    { name: ACTIONS.VIEW, label: 'View' },
  ];

  data: CreateDeploymentViewModel[] = []
  filter = {}
  allDeployment = [];
  loading: boolean = false;
  totalItems = 0;
  currentPage = 1;

  constructor(private EmployeeDeploymentServiceProxy: EmployeeDeploymentServiceProxy,
    private router: Router,) { }

  
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
    this.EmployeeDeploymentServiceProxy.employeeDeployment().toPromise().then(
      deployment => {
        this.allDeployment = deployment.result[0].lstLocations;
        this.loading = false;
      }
      
    )
}
  getuploadedfile(event){
    console.log('event')
  }

}
