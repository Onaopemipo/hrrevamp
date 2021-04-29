import { CommonServiceProxy, Competency } from 'app/_services/service-proxies';
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
    {name: 'title', title: 'Title'},
    {name: ' holderId', title: 'Employee Number'},
    {name: 'competencyId', title: 'Competency ID'},
    {name: 'unit_name', title: 'Unit'},
    {name: ' purpose', title: 'Purpose'},

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
  allCompetencies: Competency [] = [];

  allowmultipleselection: boolean = false;
  selectionHeader: string = "Select Employee";
  addbtnText: string = "Add Employee";

  constructor(
    private navCtrl: Location,
    private api: EmployeesService,
    private router:Router,
    private planService: FetchSuccessionPlanServiceProxy,
    private succession: CareerSuccessionServiceProxy,
    private alertMe: AlertserviceService,
    private commonService: CommonServiceProxy,

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
    this.fetchCompetencies()
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

  async fetchCompetencies(){
    const data = await this.commonService.getCompetency().toPromise();
    if(!data.hasError){
      this.allCompetencies = data.result;
      console.log(this.allCompetencies)
    }
  }

  async fetchAllPlans(){
    const data = await this.planService.getCareerSuccessionPlan().toPromise();
    console.log(data.result);
    if(!data.hasError){
      this.allPans = data.result;
      this.planDataCount = data.totalRecord;
      this.loading = false;
      console.log('My plans data here', this.allPans)
    }
  }

  async createSuccessionPlan(){
    const data = await this.succession.careerSuccession(this.newSuccessionPlan).toPromise();
    if(!data.hasError){
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Plan created successfully', 'Dismiss').subscribe(dataAction => {
        if(dataAction == 'closed'){
          this.fetchAllPlans();
        }
      })
    }
    }

    getSelectedEmployee(event,selectType) {
      console.log(event)
       if(selectType == 'employee'){
        this.newSuccessionPlan.holderId = event[0].employeeNumber;
        this.newSuccessionPlan.positionId = event[0].positionId;
       }
      //  if (selectType == 'relief') this.leaveReq.reliefOfficerStaffNo = event[0].employeeNumber;

       console.log(selectType, event)
    }

    getSuccessingCandidate(event,selectType) {
      console.log(event)
       if(selectType == 'employee')this.newSuccessionPlan.holderId = event[0].employeeNumber;
      //  if (selectType == 'relief') this.leaveReq.reliefOfficerStaffNo = event[0].employeeNumber;

       console.log(selectType, event)
    }

}
