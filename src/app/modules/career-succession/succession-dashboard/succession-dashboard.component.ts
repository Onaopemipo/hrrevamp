import { CommonServiceProxy, RetirementServiceProxy, RetirmentDTO, SearchEmployeesServiceProxy } from 'app/_services/service-proxies';
import { AlertserviceService } from './../../../_services/alertservice.service';
import { Router } from '@angular/router';
import { TableColumn, TableAction, TableActionEvent } from './../../../components/tablecomponent/models';
import { FetchAllEmployeesServiceProxy, EmployeeDTO, CareerSuccessionServiceProxy, ManageCareerSuccessionDto } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { checkEmployeeDTO } from 'app/components/employee-master-search/employee-master-search.component';


enum TABLE_ACTION {
  VIEW = '1',
  // CREATEPLAN = '3'
}

class MyEmployeeDTO extends EmployeeDTO{
  get position_name(){
    return this.contracts[0].positionName;
  }

  get department_name(){
    return this.contracts[0].departmentName;
  }

  get level(){
    return this.contracts[0].gradeName;
  }
}

@Component({
  selector: 'ngx-succession-dashboard',
  templateUrl: './succession-dashboard.component.html',
  styleUrls: ['./succession-dashboard.component.scss']
})
export class SuccessionDashboardComponent implements OnInit {
  searchForm: FormGroup;
  selectedEmployees:EmployeeDTO[]=[];
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
topActionButtons = [
  { name: 'employee_master', label: 'Master Search', 'icon': '', outline: false },
];
  dashboardTable: TableColumn[] = [
    {name: 'employeeNumber', title: 'Employee No.'},
    {name: 'firstName', title: 'First Name'},
    {name: 'lastName', title: 'Last Name'},
    {name: 'workEmail', title: 'Work Email'},

  ];

  readinessToStart = [
    {name: 'stage1', title: 'Stage One'},
    {name: ' stage2', title: 'Stage Two'},
    {name: 'stage3', title: 'Stage Three'},
    {name: 'stage4', title: 'Stage Four'},

  ];

  allPurposes = [
    {name: 'retirement', title: 'Retirement'},
    {name: 'firing', title: 'Firing'},
    {name: 'position', title: 'Change of Position'},
    {name: 'exit', title: 'Exit'},
  ]



  loading:boolean = true;
  myPlanHeader: string = 'Nothing to see';
  myPlanDesc: string = 'No succession plan has been set up, click the button below to add one';
  myButton: string = 'Add New Plan';

  employeeDataCount: number = 0;
  allRetireesData: RetirmentDTO [] = [];
  newPlan: boolean = false;
  successingCandidates
  newSuccessionPlan: ManageCareerSuccessionDto = new ManageCareerSuccessionDto;

  tableActions: TableAction[] = [
    {name: TABLE_ACTION.VIEW, label: 'View'},
    // {name: TABLE_ACTION.CREATEPLAN, label: 'Create Plan'},

  ]
  employeeResultTotal = 0;
  allEmployees: checkEmployeeDTO[] = [];
  allDepartment = [];
  allLocation = [];
  allJobRole = [];
  allGrade = [];
  allsalaryScale = [];
  searchbtnclicked: boolean = false;
  totalItems = 0;
  currentPage = 1;
  constructor(private router: Router,  private retirees: RetirementServiceProxy,
    private succession: CareerSuccessionServiceProxy, private alertMe: AlertserviceService,
    private allemployeeServices: SearchEmployeesServiceProxy,
    private CommonService: CommonServiceProxy) { }
    modal(buttion) {
      if (buttion === 'employee_master') {
        this.newPlan = true;
      }
    }
    get showEmpty() {
      return this.allEmployees.length === 0;
    }
  tableActionClicked(event: TableActionEvent){
     if(event.name==TABLE_ACTION.VIEW){
      this.router.navigateByUrl('/career-succession/profiledetails/' + event.data.id)
       }

      //  else if(event.name==TABLE_ACTION.CREATEPLAN){
      //   this.router.navigateByUrl('/career-succession/succession-plan-detail/' + event.data.id)
      //    }
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
    this.getRetirees();
    this.getAllDepartment();
    this.getAllLocation()
    this.getAllJobRole();
    this.getAllGrade();
    this.getAllPeoplesGroup();
  }

  // async fetchAllEmployees(){
  //   const data = await this.allEmployees.getAllEmployees(undefined,undefined,10,1).toPromise();
  //   if(!data.hasError){
  //     this.allEmployeesData = data.result;
  //     this.employeeDataCount = data.totalRecord;
  //     console.log(data.result);
  //   }
  // }

  async getRetirees(){
    const data = await this.retirees.getAllRetire('','','',0,10,'',null,null,10,10).toPromise();
    if(!data.hasError){
      this.allRetireesData = data.result;
    }
  }

  async fetchSuccessingCandidate(){
    // const data = await this.
  }

  toggleToCreatePlan(){
    this.newPlan = !this.newPlan

  }

 async createSuccessionPlan(){
  const data = await this.succession.careerSuccession(this.newSuccessionPlan).toPromise();
  if(!data.hasError){
    this.alertMe.openModalAlert('success', 'Plan created successfully', 'Dismiss')
  }
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
}
