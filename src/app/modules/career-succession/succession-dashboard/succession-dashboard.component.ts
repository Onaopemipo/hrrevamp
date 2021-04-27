import { RetirementServiceProxy, RetirmentDTO } from 'app/_services/service-proxies';
import { AlertserviceService } from './../../../_services/alertservice.service';
import { Router } from '@angular/router';
import { TableColumn, TableAction, TableActionEvent } from './../../../components/tablecomponent/models';
import { FetchAllEmployeesServiceProxy, EmployeeDTO, CareerSuccessionServiceProxy, ManageCareerSuccessionDto } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';


enum TABLE_ACTION {
  VIEW = '1',
  CREATEPLAN = '3'
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
  template: '',
  // templateUrl: './succession-dashboard.component.html',
  styleUrls: ['./succession-dashboard.component.scss']
})
export class SuccessionDashboardComponent implements OnInit {

  dashboardTable: TableColumn [] = [
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
    {name: TABLE_ACTION.CREATEPLAN, label: 'Create Plan'},

  ]
  constructor(private router: Router, private allEmployees: FetchAllEmployeesServiceProxy, private retirees: RetirementServiceProxy,
    private succession: CareerSuccessionServiceProxy, private alertMe: AlertserviceService) { }

  tableActionClicked(event: TableActionEvent){
    // if(event.name==TABLE_ACTION.DELETE){
    //   this.showdeleteModal = true
    //   }
    //   if(event.name==TABLE_ACTION.EDIT){
    //     this.router.navigateByUrl('/payroll/editpayment')
    //   }
     if(event.name==TABLE_ACTION.VIEW){
      this.router.navigateByUrl('/career-succession/profiledetails/' + event.data.id)
       }

       else if(event.name==TABLE_ACTION.CREATEPLAN){
        this.router.navigateByUrl('/career-succession/profiledetails/' + event.data.id)
         }
  }
  ngOnInit(): void {
    // this.fetchAllEmployees();
    this.getRetirees();
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

}
