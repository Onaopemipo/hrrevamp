import { AlertserviceService } from './../../../_services/alertservice.service';
import { Router } from '@angular/router';
import { TableColumn, TableAction, TableActionEvent } from './../../../components/tablecomponent/models';
import { FetchAllEmployeesServiceProxy, EmployeeDTO, CareerSuccessionServiceProxy } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';


enum TABLE_ACTION {
  VIEW = '1',
  CREATEPLAN = '3'
}

@Component({
  selector: 'ngx-succession-dashboard',
  templateUrl: './succession-dashboard.component.html',
  styleUrls: ['./succession-dashboard.component.scss']
})
export class SuccessionDashboardComponent implements OnInit {

  dashboardTable: TableColumn [] = [
    {name: 'position_name', title: 'Stage One'},
    {name: ' employee_name', title: 'Stage Two'},
    {name: 'department_name', title: 'Stage Three'},
    {name: 'unit_name', title: 'Stage Four'},

  ];

  readinessToStart = [
    {name: 'stage1', title: 'position'},
    {name: ' stage2', title: 'Employee'},
    {name: 'stage3', title: 'Department'},
    {name: 'stage4', title: 'Unit'},

  ];



  loading:boolean = true;
  myPlanHeader: string = 'Nothing to see';
  myPlanDesc: string = 'No succession plan has been set up, click the button below to add one';
  myButton: string = 'Add New Plan';

  employeeDataCount: number = 10;
  allEmployeesData: EmployeeDTO [] = [];
  newPlan: boolean = false;
//  newSuccessionPlan: CareerSuccessionDTO = new CareerSuccessionDTO;

  tableActions: TableAction[] = [
    {name: TABLE_ACTION.VIEW, label: 'View'},
    {name: TABLE_ACTION.CREATEPLAN, label: 'Create Plan'},

  ]
  constructor(private router: Router, private allEmployees: FetchAllEmployeesServiceProxy,
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
  }


  async fetchAllEmployees(){
    const data = await this.allEmployees.getAllEmployees('',0,10,1).toPromise();
    if(!data.hasError){
      this.allEmployeesData = data.result;
      console.log(data.result);
    }
  }

  toggleToCreatePlan(){
    this.newPlan = !this.newPlan

  }

//  async createSuccessionPlan(){
//   const data = await this.succession.careerSuccession(this.newSuccessionPlan).toPromise();
//   if(!data.hasError){
//     this.alertMe.openModalAlert('success', 'Plan created successfully', 'Dismiss')
//   }
//   }

}
