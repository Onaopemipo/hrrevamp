import { NgForm } from '@angular/forms';
import { CommonServiceProxy } from 'app/_services/service-proxies';
import { AlertserviceService } from './../../../_services/alertservice.service';
import { FetchAllEmployeesServiceProxy, FetchSuccessionPlanServiceProxy, CareerSuccessionDTO, CareerSuccessionServiceProxy, ManageCareerSuccessionDto, DeleteSuccesionPlanServiceProxy, CompetencyRequirmentsDTO, CompetencyServiceProxy, CompetencyDTO } from './../../../_services/service-proxies';
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
  DELETE = '2',
  EDIT = '3'
}


@Component({
  selector: 'ngx-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit {

  successionTable: TableColumn[] = [
    {name: 'title', title: 'Succession Title'},
    { name: 'holderId', title: 'Employee Id' },
    { name: 'holdersName', title: 'Employee Name'},
    {name: 'positionName', title: 'Position'},
    {name: 'competencyName', title: 'Competency'},
    {name: 'purpose', title: 'Purpose'},

  ];

  loading = false;
  allPlans: CareerSuccessionDTO [] = [];

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
    {name: 'changeofposition', title: 'Change of Position'},
    {name: 'exit', title: 'Exit'},
  ]

  topActionButtons = [
    {name: TOP_ACTIONS.ADD_MORE, label: 'Add More', 'icon': 'plus', outline: false},

  ];

  planForm: NgForm;
  myPlanHeader: string = 'Nothing to see';
  myPlanDesc: string = 'No succession plan has been set up, click the button below to add one';
  myButton: string = 'Add New Plan';
  newPlan: boolean = false;

  planDataCount: number = 0;
  newSuccessionPlan: ManageCareerSuccessionDto = new ManageCareerSuccessionDto;
  allCompetencies: CompetencyDTO [] = [];

  allowmultipleselection: boolean = false;
  selectionHeader: string = "Select Employee";
  addbtnText: string = "Add Employee";
  totalItems = 0;
  currentPage = 1;
  filter = {
    planTitle: null,
    employeeName: null,
    employeeNumber: null,
    employeeId: undefined,
    CompetencyId: undefined,
    positionId: undefined,
    pageSize: 10,
    pageNumber: 1
  }
  constructor(
    private navCtrl: Location,
    private api: EmployeesService,
    private router:Router,
    private planService: FetchSuccessionPlanServiceProxy,
    private succession: CareerSuccessionServiceProxy,
    private alertMe: AlertserviceService,
    private commonService: CommonServiceProxy,
    private deleteService: DeleteSuccesionPlanServiceProxy,
    private competencyService: CompetencyServiceProxy,



  ) { }

  filterUpdated(filter: any) {
    this.filter = { ...this.filter, ...filter };
    this.fetchAllPlans();
  }
  get showEmpty() {
    return this.allPlans.length === 0;
  }
  tableActionClicked(event: TableActionEvent){
    if(event.name==TABLE_ACTION.DELETE){
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.CONFIRM, 'Do you want to Delete this plan?', 'Yes').subscribe(dataAction => {
        if(dataAction){
          this.deleteService.deleteCareerSuccessionPlan(event.data.id).subscribe(data => {
            if (!data.hasError) {
              this.fetchAllPlans();
              this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Succession plan has been deleted', 'Dismiss').subscribe(resp => {
                if(resp) this.router.navigateByUrl('career-succession/planning');
              })
            }
          })
        }
      })
      }
     else if(event.name==TABLE_ACTION.EDIT){

      }
    else if (event.name == TABLE_ACTION.VIEW) {
      console.log(event.data)
      this.router.navigateByUrl('/career-succession/profiledetails/' + event.data.holderId);
       }
  }
 tableActions: TableAction[] = [
  {name: TABLE_ACTION.VIEW, label: 'View'},
  {name: TABLE_ACTION.DELETE, label: 'Delete'},
  {name: TABLE_ACTION.EDIT, label: 'Edit'},

]
 ngOnInit(): void {
    this.fetchAllPlans();
    this.fetchCompetencies()
    this.api.list({}).toPromise().then(response => {
      [...this.data ]= response.data;
    });
  }

  goback() {
    this.navCtrl.back();
  }

  addPlan(){
    this.newPlan = true;
  }

  cancelPlan(){
    this.newPlan = false;
  }

  async fetchCompetencies(){
    const data = await this.competencyService.fetchCompetency(undefined,undefined,10,1).toPromise();
    if(!data.hasError){
      this.allCompetencies = data.result;
      console.log(this.allCompetencies)
    }
  }

  fetchAllPlans() {
    this.loading = true;
    this.planService.getCareerSuccessionPlan(this.filter.planTitle,this.filter.employeeName,this.filter.employeeNumber,this.filter.employeeId,this.filter.CompetencyId,this.filter.positionId,this.filter.pageNumber,this.filter.pageSize)
    .subscribe(data => {
      this.loading = false;
    if(!data.hasError){
      this.allPlans = data.result;
      this.planDataCount = data.totalRecord;
      this.totalItems = data.totalRecord;
      console.log('My plans data here', this.allPlans);


    }
    })

  }

  async createSuccessionPlan(){
    const data = await this.succession.careerSuccession(this.newSuccessionPlan).toPromise();
    if(!data.hasError && data.result.isSuccessful === true){
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Plan created successfully', 'Dismiss').subscribe(dataAction => {
        if(dataAction){
          this.fetchAllPlans();
          this.newPlan = false;
        }
      })
    }
    }

    getSelectedEmployee(event,selectType) {
      console.log(event)
       if(selectType == 'employee'){
        this.newSuccessionPlan.holderId = event[0].id;
        this.newSuccessionPlan.positionId = event[0].employeeContractId;
       }
    }

    getSuccessingCandidate(event,selectType) {
      console.log(event)
       if(selectType == 'employee')this.newSuccessionPlan.stringSuccessionEmployee = event[0].employeeNumber;
       console.log(selectType, event)
    }

}
