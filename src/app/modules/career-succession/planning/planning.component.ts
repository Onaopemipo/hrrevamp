import { AlertserviceService } from './../../../_services/alertservice.service';
import { FetchAllEmployeesServiceProxy, FetchSuccessionPlanServiceProxy, CareerSuccession, CareerSuccessionServiceProxy, ManageCareerSuccessionDto } from './../../../_services/service-proxies';
import { TableColumn } from './../../../components/tablecomponent/models';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { EmployeesService, MyEmployeeDatail, } from '../services/employees.service';
import { TableAction, TableActionEvent } from 'app/components/tablecomponent/models';
import { Router } from '@angular/router';


enum TOP_ACTIONS {
  ADD_MORE,
  INITIATE_VOLUNTARY_EXIT
}
enum TABLE_ACTION {
  VIEW = '1',
  EDIT = '3'
}


@Component({
  selector: 'ngx-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit {

  successionTable: TableColumn [] = [
    {name: 'position_name', title: 'position'},
    {name: ' employee_name', title: 'Employee'},
    {name: 'department_name', title: 'Department'},
    {name: 'unit_name', title: 'Unit'},
    {name: ' level', title: 'Level'},

  ];

  loading = false;
  allPans: CareerSuccession [] = [];

  // id: number;
  // position_name: string;
  // employee_name: string;
  // department_name: string;
  // unit_name: string;
  // level: number;
  // location_name: string;
  // picture: string;

 data: MyEmployeeDatail[] = []

  // tableColumn =[
  //   { name: 'Name', title: 'NAME' },
  //   { name: 'PaymentType', title: 'PAYMENT TYPE' },
  //   { name: 'ElementName', title: 'ELEMENT NAME' },
  //   { name: 'ElementCategory', title: 'ELEMENT CATEGORY' },
  //   { name: 'ElementType', title: 'ELEMENT TYPE' },
  //   { name: 'e', title: 'ELEMENT TYPE' },
  //   { name: 'f', title: 'AMOUNT' },
  //   { name: 'g', title: 'INSTITUTION' },
  // ];


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


  topActionButtons = [
    {name: TOP_ACTIONS.ADD_MORE, label: 'Add More', 'icon': 'plus', outline: false},

  ];

  myPlanHeader: string = 'Nothing to see';
  myPlanDesc: string = 'No succession plan has been set up, click the button below to add one';
  myButton: string = 'Add New Plan';
  newPlan: boolean = false;

  planDataCount: number = 0;
  newSuccessionPlan: ManageCareerSuccessionDto = new ManageCareerSuccessionDto;

  constructor(
    private navCtrl: Location,
    private api: EmployeesService,
    private router:Router,
    private planService: FetchSuccessionPlanServiceProxy,
    private succession: CareerSuccessionServiceProxy,
    private alertMe: AlertserviceService,

  ) { }

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
  }
 tableActions: TableAction[] = [
  {name: TABLE_ACTION.VIEW, label: 'View'},
  {name: TABLE_ACTION.EDIT, label: 'Edit'},

]
 ngOnInit(): void {
    this.loading = true;
    this.api.list({}).toPromise().then(response => {
      [...this.data ]= response.data;
      this.loading = false;
    });

    this.fetchAllPlans();
  }

  goback() {
    this.navCtrl.back();
  }

  toggleToCreatePlan(){
    this.newPlan = !this.newPlan

  }

  addPlan(){
    // this.newPlan = !this.newPlan;
  }

  async fetchAllPlans(){
    const data = await this.planService.getCareerSuccessionPlan().toPromise();
    if(data.hasError){
      this.allPans = data.result;
      this.planDataCount = data.totalRecord;
    }
  }

  async createSuccessionPlan(){
    const data = await this.succession.careerSuccession(this.newSuccessionPlan).toPromise();
    if(!data.hasError){
      this.alertMe.openModalAlert('success', 'Plan created successfully', 'Dismiss')
    }
    }

}
