import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ACTIONS, TableAction, TableActionEvent,ColumnTypes } from 'app/components/tablecomponent/models';
import { AlertserviceService } from 'app/_services/alertservice.service';
import {
  EmployeeDeploymentServiceProxy, DeploymentRegistrationPayLoad, CreateDeploymentViewModel,
  DataServiceProxy, CommonServiceProxy, LGA, State, Location, AddUpdateDeploymentServiceProxy, IDTextViewModel, FileParameter, UploadDocumentServiceProxy, FetchDeploymentServiceProxy, DeploymentLog, IVwUserObj, DeploymentLogDTO
} from '../../../_services/service-proxies';
import { FlowDirective, Transfer } from '@flowjs/ngx-flow';
import { IStatus, MyColor } from 'app/components/status/models';
import { AuthenticationService } from 'app/_services/authentication.service';
import { inherits } from 'util';


export class DeploymentWithStatus extends DeploymentLogDTO implements IStatus {
  deploymentList: DeploymentLogDTO;

  constructor(leaveYear: DeploymentLogDTO) {
    super(leaveYear);
    this.deploymentList = leaveYear;

  }
  get status() {
    return this.deploymentList.log_status;
  }
  getStatusLabel() {
    if (this.deploymentList.log_status === 1) return 'Pending';
    if (this.deploymentList.log_status === 2) return 'Approved';
    if (this.deploymentList.log_status === 3) return 'Rejected';

  }
  getStatusColor() {
    if (this.deploymentList.log_status === 1) return new MyColor(242, 153, 74);
    if (this.deploymentList.log_status === 2) return new MyColor(0, 153, 74);
    if (this.deploymentList.log_status === 3) return new MyColor(253, 238, 238);
    return new MyColor(242, 0, 74);
  }
}
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
    { name: 'employeeName', title: 'EMPLOYEE' },
    { name: 'staffNumber', title: 'STAFF NO' },
    { name: 'appointmentDate', title: 'APPOINTMENT DATE' ,type: ColumnTypes.Date},
    { name: 'request_by', title: 'REQUESTED BY' },
    { name: 'log_status', title: 'REQUESTED STATUS', type: ColumnTypes.Status },
  ];
  topActionButtons = [
    { name: TOP_ACTIONS.DEPLOYMENT_APPLICATION, label: 'Apply for Deployment', 'icon': '', outline: false },
  ];
  tableActions: TableAction[] = [
    { name: ACTIONS.VIEW, label: 'View' },
  ];

  data: CreateDeploymentViewModel[] = []
  filter = {}
  allDeployment= [];
  loading: boolean = false;
  totalItems = 0;
  currentPage = 1;
  showDeploymentApplicationModal: boolean = false;
  alllocations: Location[] = [];
  alllgaByStates: LGA[] = [];
  allStates: State[] = [];
  DeploymentRegistration = new DeploymentRegistrationPayLoad().clone();
  modificationStatus: boolean = false;
  _files: Transfer[] = [];
  IDTextView: IDTextViewModel[] = [];
  tempRef = '';
  allfileObj: FileParameter[] = [];

  filterObj = {
    CompanyID: undefined,
    SubID: undefined,
    employeeContractid: undefined,
    Name: null,
    ID: undefined,
    strStartDate: undefined,
    strEndDate: undefined,
    ReferenceId: undefined,
    Code: "1",
    pageNumber: 1,
    pageSize: 10

  }
  fileObj = {
    userId: 0,
    title: '',
    itemId: 0,
    entityId: 0,
    isReadOnly: false,
    tempRef: '',
    files: this.allfileObj
  }

 
  constructor(private EmployeeDeploymentServiceProxy: EmployeeDeploymentServiceProxy, private router: Router,private alertservice: AlertserviceService,
    private myDropdown: DataServiceProxy, private UploadDocumentService: UploadDocumentServiceProxy,
    private CommonService: CommonServiceProxy, private AddUpdateDeployentService: AddUpdateDeploymentServiceProxy,
  private FetchDeploymentService:FetchDeploymentServiceProxy,private AuthenService: AuthenticationService,) { }
  
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
    this.FetchDeploymentService.fetchDeployment(this.filterObj.CompanyID,
      this.filterObj.SubID, this.filterObj.employeeContractid, this.filterObj.Name, this.filterObj.ID,
      this.filterObj.strStartDate, this.filterObj.strEndDate, this.filterObj.ReferenceId, this.filterObj.Code,
      this.filterObj.pageNumber,this.filterObj.pageSize).toPromise().then(
        deployment => {
          var deply = deployment.result.map(deply => new DeploymentWithStatus(deply));      

          this.totalItems = deployment.totalRecord;
        this.allDeployment = deply;
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
        this.DeploymentRegistration.is_new = true;
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
  getdocumentEntity() {
    this.myDropdown.docEntityTypes().subscribe(data => {
      if (!data.hasError) {
        this.IDTextView = data.result;
   }
 })
  }
  documentUpload() {
    this._files.forEach(value => {
      var newfilObj: FileParameter = {
        data: value.flowFile.file,
        fileName: value.flowFile.name
      }
      this.fileObj.files.push(newfilObj);
    });
    this.fileObj.entityId = this.IDTextView.find(e => e.text == "OTHERS").id;   
    this.fileObj.tempRef = this.tempRef;
    this.fileObj.title ="Company Logo";
    this.UploadDocumentService.uploadDocs(this.fileObj.userId, this.fileObj.title, this.fileObj.itemId, this.fileObj.entityId, this.fileObj.isReadOnly, this.fileObj.tempRef, this.fileObj.files)
      .subscribe(data => {
      if (!data.hasError) {
        console.log('file success');
      }
    });
  }
  getUploadedFile(event) {
    this._files = event;
    this.documentUpload();
  }
  getUsersDetails() {
    this.AuthenService.getuser().then((usersdata: IVwUserObj[]) => {
      console.log(usersdata)
      if (usersdata.length > 0) {
        this.filterObj.employeeContractid = usersdata[0].employee_contract_id;
        //console.log(this.filterObj)
        this.getallDeploymentRequest();
      } else {
        this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.FAILED, "Session TimeOut", "Login").subscribe(data => {
          this.AuthenService.clearusers();
        });
      }
    });
  }
  filtertabConf(is_approved = []) {   
    let tabtittle = "";
    is_approved.forEach(value => {
      if (value.activeValue) tabtittle = value.tabTitle;
    });
   // console.log(tabtittle);
    this.filterObj.Code = tabtittle == 'Due' ? "0" :
      (tabtittle == 'Pending' ? "1" : (tabtittle == 'Approved' ? "2" : (tabtittle == 'Declined' ? "3" : "4")));
    this.getallDeploymentRequest();
  }

  ngOnInit(): void {
    this.getUsersDetails()
    this.getStatebyCountryId();
    this.getalllocations();
  
    this.getdocumentEntity();
    this.tempRef = `ref-${Math.ceil(Math.random() * 10e13)}`;
    this.DeploymentRegistration.is_new = true;

  }
  

}
