import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ACTIONS, TableAction, TableActionEvent } from 'app/components/tablecomponent/models';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { EmployeeDeploymentServiceProxy,DeploymentRegistrationPayLoad, CreateDeploymentViewModel, DataServiceProxy, CommonServiceProxy, LGA, State,Location, AddUpdateDeployentServiceProxy } from '../../../_services/service-proxies';

enum TOP_ACTIONS {
  
  DEPLOYMENT_APPLICATION
}
@Component({
  selector: 'ngx-deploymentapplication',
  templateUrl: './deploymentapplication.component.html',
  styleUrls: ['./deploymentapplication.component.scss']
})
export class DeploymentapplicationComponent implements OnInit {
  deploymentForm: FormGroup;
  tableColumns = [
    { name: 'a', title: 'S/N' },
    { name: 'b', title: 'EMPLOYEE' },
    { name: 'refNo', title: 'STAFF NO' },
    { name: 'effective_date', title: 'APPOINTMENT DATE' },
    { name: 'e', title: 'PROBATION PERIOD' },
    { name: 'request_by', title: 'REQUESTED BY' },
    { name: 'log_status', title: 'REQUESTED STATUS' },
  ];
  topActionButtons = [
    { name: TOP_ACTIONS.DEPLOYMENT_APPLICATION, label: 'Apply for Deployment', 'icon': '', outline: false },
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
  showDeploymentApplicationModal: boolean = false;
  alllocations: Location[] = [];
  alllgaByStates: LGA[] = [];
  allStates: State[] = [];
  DeploymentRegistration = new DeploymentRegistrationPayLoad().clone();
  modificationStatus: boolean = false;
  constructor(private EmployeeDeploymentServiceProxy: EmployeeDeploymentServiceProxy, private router: Router,private alertservice: AlertserviceService,
    private myDropdown: DataServiceProxy,private CommonService: CommonServiceProxy, private AddUpdateDeployentService: AddUpdateDeployentServiceProxy) { }
  
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

  getallDeploymentRequest() {
    this.loading = true;
    this.EmployeeDeploymentServiceProxy.employeeDeployment().toPromise().then(
      deployment => {
        this.data = deployment.result;
        this.loading = false;
      }
      
    )
  }
  applyForLeave() {
    this.loading = true;
    this.AddUpdateDeployentService.addUpdateDeployment(this.DeploymentRegistration).subscribe(data => {
      if (!data.hasError) {
        this.getallDeploymentRequest();
        this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.SUCCESS, data.message, 'OK');
        this.DeploymentRegistration = new DeploymentRegistrationPayLoad().clone();
        this.showDeploymentApplicationModal = false;
        this.modificationStatus = false;
      }  else {
        this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.FAILED, data.message, 'OK')
      }
      this.loading = false;
    }, (error) => {
      this.loading = false;
      if (error.status == 400) {
        this.alertservice.openCatchErrorModal(this.alertservice.ALERT_TYPES.FAILED, error.title, "Ok", error.errors);
      }
    })
  }
  modal(buttion) {
    if(buttion === TOP_ACTIONS.DEPLOYMENT_APPLICATION){
      this.showDeploymentApplicationModal = true;
    }
  }
  getStatebyCountryId() {
    this.myDropdown.getStates().subscribe(data => {
      if(!data.hasError){
         this.allStates = data.result;
      }
      else {
        console.log('There was an error')
      }
    })
  }
  getalllocations() {
    this.CommonService.getLocations().subscribe(data => {
      if (!data.hasError) {
        this.alllocations = data.result;
      }else{}
      
    })
  }
  getlgaByStateId(state_id) {
    let id = state_id? this.allStates.find(x=>x.state_name == state_id).id : 0;
    
    this.myDropdown.getLGAsByState(id).subscribe(data => {
      if(!data.hasError){
         this.alllgaByStates = data.result;
      }
      else {
        console.log('There was an error')
      }
    })
  }
  getUploadedFile(event) {
    console.log(event)
  }
  ngOnInit(): void {
    this.getStatebyCountryId();
    this.getalllocations();
    this.getallDeploymentRequest();
  }
  

}
