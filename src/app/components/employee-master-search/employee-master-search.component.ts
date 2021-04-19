import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import {
  EmployeeDTO, CommonServiceProxy,SearchEmployeesServiceProxy
} from '../../_services/service-proxies';


export interface checkEmployeeDTO extends EmployeeDTO{
  checkInputValue?: boolean;
}


@Component({
  selector: 'ngx-employee-list',
  template: `    
    <div style="display: inline-flex;" *ngIf="allowmultipleselection">
      <div *ngFor="let i of selectedEmployees" >
          <img style="width: 3rem; height: 3rem; border-radius: 50%; margin-left: -0.5rem;" [src]="i.profilePic"  onError="this.src='assets/icons/camera.jpg'"/>
      </div>
    </div>

    <div style="display: flex;flex-direction:row" *ngIf="!allowmultipleselection && selectedEmployeeRecord">
    <div> <img style="width: 3rem; height: 3rem; border-radius: 50%; margin-left: -0.5rem;" [src]="selectedEmployeeRecord.profilePic"  onError="this.src='assets/icons/camera.jpg'"/></div>
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
    gradeId?: number;

}={searchDepartment:0,searchLocation:0,searchJobRole:0,saerchGrade:0,searchPeopleGroup:0,searchtText:'',pageSize:1000,salaryscaleId:0};
employeeResultTotal = 0;
  allEmployees: checkEmployeeDTO[] = [];
  allDepartment = [];
  allLocation = [];
  allJobRole = [];
  allGrade = [];
  allsalaryScale = [];
@Input() addbtnText: string = '';
@Input() allowmultipleselection: boolean = false;
  @Input() selectionHeader = 'Select Employees';
  @Output() masterSubmitted = new EventEmitter<EmployeeDTO[]>();
  @Input() value = [];
  @Output() valueChange = new EventEmitter<number[]>();
 
  constructor(private allemployeeServices: SearchEmployeesServiceProxy,
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
      if (value && (value != "" || value != null) && (key != 'pageSize')) {

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
  this.allemployeeServices.searchEmployees(this.filterObject.pageSize, this.filterObject.companyId,
    this.filterObject.searchtText, this.filterObject.searchPeopleGroup, this.filterObject.searchDepartment,
  this.filterObject.searchJobRole,this.filterObject.searchLocation,this.filterObject.salaryscaleId,this.filterObject.gradeId,this.filterObject.gradestepId).subscribe(data => {
if(!data.hasError){
  this.allEmployees = data.result
  this.allEmployees.map(x => {
    x.checkInputValue = false;
    return x;
  });
  console.log(this.allEmployees);
  this.employeeResultTotal = data.totalCount;
  this.searchbtnclicked = false;
}else{

}
  })
  }

  updateSelectedEmployee(i) {
  let employeContId = this.allEmployees[i].employeeContractId;

  if (this.allowmultipleselection) {
    let emploExistChk = this.selectedEmployees.find(e => e.employeeContractId == employeContId);
    if (emploExistChk) {
      let empPost = this.selectedEmployees.findIndex(e => e.employeeContractId == employeContId);
      this.selectedEmployees.splice(empPost, 1);
      this.selectedEmployeeRecord = this.emptyRecord;
      this.allEmployees[i].checkInputValue = false;
    } else {
      this.selectedEmployees.push(this.allEmployees[i]);
      this.selectedEmployeeRecord = this.emptyRecord;   
      this.allEmployees[i].checkInputValue = true;
    }
  } else {
    this.allEmployees.map(x => {
      x.checkInputValue = false;
      return x;
    });
    if (this.selectedEmployeeRecord && this.selectedEmployeeRecord.employeeContractId == employeContId) {
      this.selectedEmployeeRecord = this.emptyRecord;
      this.selectedEmployees = [];
      
    } else {
      this.selectedEmployeeRecord = this.allEmployees[i];
      this.selectedEmployees = [];
      this.allEmployees[i].checkInputValue = true;
    }
  }

}
  showModal = false;
  okMasterSearch() {
    if (!this.allowmultipleselection){ this.selectedEmployees = []; this.selectedEmployees.push(this.selectedEmployeeRecord);}
    this.masterSubmitted.emit(this.selectedEmployees);
    this.valueChange.emit(this.selectedEmployees.map(employee => employee.id));
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
