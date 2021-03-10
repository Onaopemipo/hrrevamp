import { Component, Input, OnInit } from '@angular/core';
import {EmployeeDTO, FetchAllEmployeesServiceProxy} from '../../_services/service-proxies';
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
  selectedEmployees:EmployeeDTO[]=[];
  selectedEmployeeRecord :EmployeeDTO;
  emptyRecord: EmployeeDTO;
  src:string = '';
  searchbtnclicked: boolean = false;
filterObject:{
  searchtText?: string;
  contractStatus?: number,
  pageSize?: number
}={};
employeeResultTotal = 0;
allEmployees:EmployeeDTO[]=[];
@Input() addbtnText: string = '';
@Input() allowmultipleselection: boolean = false;
@Input() selectionHeader = 'Select Employees';
  constructor(private allemployeeServices: FetchAllEmployeesServiceProxy) { }
get disableaddbtn(){
  if(this.selectedEmployeeRecord){
    return true;
  }
  if(this.selectedEmployees.length > 0){
    return true;
  }
 
  return false;
}
  ngOnInit(): void {
  }
getallemployee(){
this.searchbtnclicked = true;
  this.allemployeeServices.getAllEmployees(this.filterObject.searchtText,this.filterObject.contractStatus,this.filterObject.pageSize).subscribe(data=>{
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
let emploExistChk = this.selectedEmployees.find(e=> e.employeeContractId == employeContId);
if(emploExistChk){
  if(this.allowmultipleselection){
    this.selectedEmployees.splice(i,1)
  }else{
    this.selectedEmployeeRecord = this.emptyRecord;
  }  
}else{
  if(this.allowmultipleselection){
    this.selectedEmployees.push(this.allEmployees[i]);
  }else{
    this.selectedEmployeeRecord = this.allEmployees[i];
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
