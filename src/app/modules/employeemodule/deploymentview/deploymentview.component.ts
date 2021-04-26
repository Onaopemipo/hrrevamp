import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmployeeDTOApiResult, IDeploymentRegistrationPayLoad,EmployeeDTO,VwConfirmationDTO, DeploymentLogDTO,Location,DropdownValue } from '../../../_services/service-proxies';
import { SaveConfirmationServiceProxy, FetchEmployeeByIdServiceProxy,CommonServiceProxy,DataServiceProxy } from '../../../_services/service-proxies';




enum TOP_ACTIONS {
  APPLY_FOR_LEAVE,
  ADD_PLAN
}

@Component({
  selector: 'ngx-deploymentview',
  templateUrl: './deploymentview.component.html',
  styleUrls: ['./deploymentview.component.scss']
})
export class DeploymentviewComponent implements OnInit {
  feedbackForm: FormGroup;
  employee: EmployeeDTO = new EmployeeDTO(); 
  mgr_feedback: string = '';
  mgr_advice: string = '';
 

  topActionButtons = [
    { name: TOP_ACTIONS.APPLY_FOR_LEAVE, label: 'Add', 'icon': 'plus', outline: true },
  ];

  tableColumns = [
    { name: '', title: ' Qualification Name' },
    { name: '', title: 'Qualification Type' },
    { name: '', title: 'Course Name' },
    { name: '', title: 'Institution' },
    { name: '', title: 'Start Date' },
    { name: '', title: 'End Date' },
  ];
  selectedCase: string = 'personal_Info';
  selectedPanel: any = { title: 'personal_Info', label: 'Personal Information', status: 'Active' };
  employeeviewlist = [
    { title: 'personal_Info', label: 'Personal Information', status: 'Active', iconname: 'person' },
    { title: 'deployment_info', label: 'Deployment Information', status: 'Inactive', iconname: 'inbox' },

  ];
  comfirmationData = new DeploymentLogDTO().clone();
  jobName: string = '';
  departmentName: string = '';
  totalItems = 0;
  currentPage = 1;
  alllocations: Location[] = [];
  maritalStatusValues: DropdownValue[] = [];
  constructor(private myDropdown: DataServiceProxy,private activatedRoute: ActivatedRoute,private CommonService: CommonServiceProxy,
    private FetchEmployeeByIdServiceProx: FetchEmployeeByIdServiceProxy,
    private SaveConfirmation:SaveConfirmationServiceProxy ) { }
  selectPanel(hiringlist, i) {
    this.selectedPanel = hiringlist;

    this.employeeviewlist.forEach(value => {
      value.status = 'Inactive';
    });
    this.employeeviewlist[i].status = 'Active';
    this.selectedCase = this.employeeviewlist[i].title;
  }
  getalllocations() {
    this.CommonService.getLocations().subscribe(data => {
      if (!data.hasError) {
        this.alllocations = data.result;
      }else{}
      
    })
  }
getEmployeebyId(employeeId) {
  this.FetchEmployeeByIdServiceProx.getEmployeeById(employeeId).subscribe((data) => {
    if (!data.hasError) {
      this.employee= data.result;
      this.jobName = this.employee.contracts.length > 0 ? this.employee.contracts[0].jobName : "";
      this.departmentName = this.employee.contracts.length > 0 ? this.employee.contracts[0].departmentName : "";
      this.totalItems = this.employee.qualifications.length;   
        }
  });
  }
  getLocationNAme(locationId): string {

    if (locationId) {
      if (this.alllocations.length > 0) {
        var sRes = this.alllocations.find(l => l.id == locationId);
        return sRes ? sRes.location_name : "";
      }
    }
    return "";
  }
  getMaritalStatus() {
    this.myDropdown.getDropDownValuesById(4).subscribe(data => {
      if (!data.hasError) {
        this.maritalStatusValues = data.result;
        console.log(this.maritalStatusValues)
      }
      else {
        console.log('There was an error')
      }
    })
  }
  getMaritalNAme(maritalStatusId): string {
    if (maritalStatusId) {
      if (this.maritalStatusValues.length > 0) {
        var sRes = this.maritalStatusValues.find(l => l.option_value == maritalStatusId);
        return sRes ? sRes.option_text : "";
      }
    }
    return "";
  }
  ngOnInit(): void {
    this.getalllocations();
    this.getMaritalStatus();
    this.employee.contracts = [];
    this.employee.addresses = [];
    this.employee.qualifications = [];
    this.activatedRoute.queryParams.subscribe(data => {
      if (data.data) {
        this.comfirmationData = JSON.parse(data.data);
        this.getEmployeebyId(this.comfirmationData.employeeid)
 
      }}
    );
  }
  onSubmit(body:VwConfirmationDTO) {
    this.SaveConfirmation.saveConfirmation(body).toPromise().then(
      feedback => alert(feedback)
    )
  }

  get   showEmptyQualifications(){
    return this.employee.qualifications.length === 0;
  }

  modal(buttion) {
    // if (buttion === TOP_ACTIONS.ADD_LEAVE_TYPE) {
    // this.showLeaveTypeModal = true

    // }

  }


}
