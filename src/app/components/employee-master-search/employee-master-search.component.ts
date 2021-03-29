import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {EmployeeDTO,CommonServiceProxy, FetchAllEmployeesServiceProxy, GetAllDepartmentsServiceProxy, GetAllJobRolesServiceProxy, GetAllLocationsServiceProxy, GradeLevelServiceProxy, SalaryscaleServiceProxy, SearchEmployeesServiceProxy} from '../../_services/service-proxies';
@Component({
  selector: 'ngx-employee-list',
  template: `    
    <div style="display: inline-flex;" *ngIf="allowmultipleselection">
      <div *ngFor="let i of selectedEmployees" >
          <img style="width: 3rem; height: 3rem; border-radius: 50%; margin-left: -0.5rem;" [src]="i.profilePic"  onError="this.src='https://via.placeholder.com/300/09f.png/fff%20C/O%20https://placeholder.com/'"/>
      </div>
    </div>

    <div style="display: flex;flex-direction:row" *ngIf="!allowmultipleselection && selectedEmployeeRecord">
    <div> <img style="width: 3rem; height: 3rem; border-radius: 50%; margin-left: -0.5rem;" [src]="selectedEmployeeRecord.profilePic"  onError="this.src='https://via.placeholder.com/300/09f.png/fff%20C/O%20https://placeholder.com/'"/></div>
    <div style="padding: 10px 0px 0px 5px">{{selectedEmployeeRecord.firstName}} &nbsp; {{selectedEmployeeRecord.lastName}}</div>
    </div>
`,
  styleUrls: ['./employee-master-search.component.scss']
})
export class EmployeeListComponent {
  src: string = '';
  @Input() allowmultipleselection: boolean = false;
  @Input() selectedEmployees:EmployeeDTO[]=[];
  @Input() selectedEmployeeRecord: EmployeeDTO;
}

@Component({
  selector: 'ngx-employee-master-search',
  templateUrl: './employee-master-search.component.html',
  styleUrls: ['./employee-master-search.component.scss']
})
export class EmployeeMasterSearchComponent implements OnInit {
  searchForm: FormGroup;
  selectedEmployees:EmployeeDTO[]=[];
  selectedEmployeeRecord :EmployeeDTO;
  emptyRecord: EmployeeDTO;
  src:string = '';
  searchbtnclicked: boolean = false;
  filterObject: {
    searchDepartment?: number;
    searchLocation?: number;
    searchJobRole?: number;
    saerchGrade?: number
    searchPeopleGroup?: number;
  searchtText?: string;
    pageSize?: number;

    companyId?: number;
    searchType?: number;
    ministryId?: number;
    salaryscaleId?: number;
    gradestepId?: number;

}={searchDepartment:0,searchLocation:0,searchJobRole:0,saerchGrade:0,searchPeopleGroup:0,searchtText:'',pageSize:1000,salaryscaleId:0};
employeeResultTotal = 0;
  allEmployees: EmployeeDTO[] = [];
  allDepartment = [];
  allLocation = [];
  allJobRole = [];
  allGrade = [];
  allsalaryScale = [];
@Input() addbtnText: string = '';
@Input() allowmultipleselection: boolean = false;
@Input() selectionHeader = 'Select Employees';
  constructor(private allemployeeServices: SearchEmployeesServiceProxy,
    private alldepartmentService: GetAllDepartmentsServiceProxy,
    private GradeLevelService: GradeLevelServiceProxy,
    private GetAllJobRolesService: GetAllJobRolesServiceProxy,
    private GetAllLocationsService: GetAllLocationsServiceProxy,
    private SalaryscaleService: SalaryscaleServiceProxy,
  private CommonService: CommonServiceProxy) { }
  
  get disableaddbtn() {
  if(this.selectedEmployeeRecord || this.selectedEmployees.length > 0){
    return true;
  } else {
    return false;
  }  
  }

  get disableSearchBtn() {
    let resp: boolean = true;
    Object.entries(this.filterObject).map(([key, value], index) => {
      if (value && (value != "" || value != null)) {

        resp = false;
      }
    });

    return resp;
  }

  getAllDepartment() {
    this.CommonService.getDepartments().subscribe(res => {
      if (!res.hasError) {
        this.allDepartment = res.result;
  }
})
    
  }
  getAllLocation() {
    this.CommonService.getLocations().subscribe(res => {
      if (!res.hasError) {
        this.allLocation = res.result;
  }
    })
  }
  getAllJobRole() {
    this.CommonService.getJobRoles().subscribe(res => {
      if (!res.hasError) {
        this.allJobRole = res.result;
  }
    })
   
  }
  getAllGrade() {
    this.CommonService.getGrades().subscribe(res => {
      if (!res.hasError) {
        this.allGrade = res.result;
  }
    })
  }
  getAllSalaryScale() {
    this.CommonService.getSalaryScale().subscribe(res => {
      if (!res.hasError) {
        this.allsalaryScale = res.result;
  }
    })
  }
  getAllPeoplesGroup() {
    
  }
  ngOnInit(): void {
    this.getAllDepartment();
    this.getAllLocation()
    this.getAllJobRole();
    this.getAllGrade();
    this.getAllPeoplesGroup();
  }
getallemployee(){
this.searchbtnclicked = true;
  this.allemployeeServices.searchEmployees(this.filterObject.pageSize, this.filterObject.companyId, this.filterObject.searchType,
    this.filterObject.searchtText, this.filterObject.searchPeopleGroup, this.filterObject.ministryId, this.filterObject.searchDepartment,
  this.filterObject.searchJobRole,this.filterObject.searchLocation,this.filterObject.salaryscaleId,this.filterObject.gradestepId,this.filterObject.gradestepId).subscribe(data => {
if(!data.hasError){
  this.allEmployees = data.result
  this.employeeResultTotal = data.totalCount;
  this.searchbtnclicked = false;
}else{

}
  })
}
updateSelectedEmployee(i){
  let employeContId = this.allEmployees[i].employeeContractId;
  
  if (this.allowmultipleselection) {
    let emploExistChk = this.selectedEmployees.find(e => e.employeeContractId == employeContId);
    if (emploExistChk) {
      this.selectedEmployees.splice(i, 1)
      this.selectedEmployeeRecord = this.emptyRecord;
    } else {
      this.selectedEmployees.push(this.allEmployees[i]);
      this.selectedEmployeeRecord = this.emptyRecord;
    }
  } else {
    if (this.selectedEmployeeRecord) {
      this.selectedEmployeeRecord = this.emptyRecord;
      this.selectedEmployees = [];
    }else{
      this.selectedEmployeeRecord = this.allEmployees[i];
      this.selectedEmployees = [];
    }
  }

}
  showModal = false;
okMasterSearch(){
  this.showModal = false;
}
cancelMasterSearch(){
  this.selectedEmployees = [];
  this.allEmployees = [];
  this.selectedEmployeeRecord = this.emptyRecord;
  this.showModal = false;
}
  showMasterSearchModal() {
    this.showModal = true;
  }
}
