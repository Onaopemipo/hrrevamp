import { TableAction } from 'app/components/tablecomponent/models';
import { NgForm } from '@angular/forms';
import { Contacts } from './../../../@core/data/users';
import { AlertserviceService } from './../../../_services/alertservice.service';
import { EmployeeCertification } from './../services/employees.service';
import { Certification, CommonServiceProxy, CompetencyRequirmentsDTO } from 'app/_services/service-proxies';
import { map } from 'rxjs/operators';
import { FetchEmployeeByIdServiceProxy, EmployeeDTO, EmployeeContractAssignmentDTO, FetchAllEmployeesServiceProxy, GetCareerSuccesionPlanByIdServiceProxy, CareerSuccessionDTO, EmployeeCertificationDTO, EmployeeHistoryDTO, EmployeeSkillDTO, EmployeeQualificationDTO, ManageCareerSuccessionDto, CareerSuccessionServiceProxy, EmployeePossibleSuccessorServiceProxy, CompetencyServiceProxy, FetchSuccessionPlanServiceProxy, CompetencyDTO, CareerSuccessorDTO } from './../../../_services/service-proxies';
import { TableColumn, TableActionEvent } from './../../../components/tablecomponent/models';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmployeesService, MyEmployeeDatail, } from '../services/employees.service';
import { throwIfAlreadyLoaded } from 'app/@core/module-import-guard';
import { stringify } from '@angular/compiler/src/util';

// enum TOP_ACTIONS {
//   ADD_MORE,
//   INITIATE_VOLUNTARY_EXIT
// }
enum TABLE_ACTION {
  VIEW = '1',
  DELETE = '2',
  EDIT = '3'
}
class MyEmployeeDTO extends EmployeeDTO{

  get position_name(){
    return this.contracts[0].positionName;
  }

  get positionId(){
    return this.contracts[0].positionId;
  }

  get departmentName(){
    return this.contracts[0].departmentName;
  }

  get jobName(){
    return this.contracts[0].jobName;
  }

  get locationName(){
    return this.contracts[0].locationName;
  }
  get gradeName(){
    return this.contracts[0].gradeName;
  }

  // get myCertifications(){
  //   return this.certifications
  // }

  // get mySkills(){
  //   return this.skills[0];
  // }

  // myCertification

  // get myQualifications(){
  //   return this.qualifications[0] ;
  // }


}
@Component({
  selector: 'ngx-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {

  data: MyEmployeeDatail = new MyEmployeeDatail({});
  successionTable: TableColumn[] = [
    { name: 'name', title: 'Name' },
    { name: 'position', title: 'Position' },
    { name: 'experience', title: 'Experience' },
    { name: 'qualification', title: 'Qualification' },
    { name: 'certification', title: 'certification' },
  ];

  successorsTable: TableColumn[] = [
    { name: 'employeeId', title: 'Employee ID' },
    { name: 'employeeName', title: 'Employee Name' },
    { name: 'experience', title: 'Experience' },
    { name: 'qualification', title: 'Qualification' },
    { name: 'certification', title: 'certification' },
  ];

  allPurposes = [
    {name: 'retirement', title: 'Retirement'},
    {name: 'firing', title: 'Firing'},
    {name: 'changeofposition', title: 'Change of Position'},
    {name: 'exit', title: 'Exit'},
  ]

  tableActionClicked(event: TableActionEvent){
    if(event.name==TABLE_ACTION.DELETE){

      }
     else if(event.name==TABLE_ACTION.EDIT){
        this.router.navigateByUrl('/payroll/editpayment')
      }
    else if (event.name == TABLE_ACTION.VIEW) {
      console.log(event.data)
      this.router.navigateByUrl('/career-succession/profiledetails/' + event.data.id);
       }
  }
 tableActions: TableAction[] = [
  {name: TABLE_ACTION.VIEW, label: 'View'},
  {name: TABLE_ACTION.DELETE, label: 'Delete'},
  {name: TABLE_ACTION.EDIT, label: 'Edit'},

]

  allowmultipleselection: boolean = true;
  selectionHeader: string = "Select Employee";
  addbtnText: string = "Add Employee";

  employeeData: MyEmployeeDTO = new MyEmployeeDTO;
  employeeContractData: EmployeeContractAssignmentDTO = new EmployeeContractAssignmentDTO
  employeeId: number = 0;
  planStatus: boolean = false;
  competencyId: number = 0;
  addCandidateForm: NgForm;
  newPlan: boolean = false;
  allCompetencies: CompetencyDTO [] = [];
  roleCompetency: CompetencyRequirmentsDTO = new CompetencyRequirmentsDTO;
  planDetails: CareerSuccessionDTO = new CareerSuccessionDTO;
  pageLoading:boolean = true;
  planData: CareerSuccessionDTO = new CareerSuccessionDTO();
  // planData: CareerSuccessionDTO []= [];
  certificationData: EmployeeCertificationDTO [] = [];
  experienceData: EmployeeHistoryDTO [] = [];
  skillsData: EmployeeSkillDTO [] = [];
  qualificationData: EmployeeQualificationDTO [] = [];
  updateSuccessionPlan: ManageCareerSuccessionDto = new ManageCareerSuccessionDto();
  newSuccessionPlan: ManageCareerSuccessionDto = new ManageCareerSuccessionDto();
  successionData: EmployeeDTO [] = [];
  planDataCounter:number = 0;
  positionId: number = 0;
  successorCount: number = 0;
  newSuccessor:boolean = false;
  allCandidate = [];
  loading: boolean = true;
  successionEmployeesData: CareerSuccessorDTO [] = [];

  constructor(private navCtrl: Location, private alertMe: AlertserviceService,
    private activatedRoute: ActivatedRoute,private succession: CareerSuccessionServiceProxy,
    private employeeService: EmployeesService, private employee: FetchEmployeeByIdServiceProxy,
    private allEmployees: FetchAllEmployeesServiceProxy, private router: Router, private planById: FetchSuccessionPlanServiceProxy,
    private successionService: GetCareerSuccesionPlanByIdServiceProxy, private successor: EmployeePossibleSuccessorServiceProxy,
    private commonService: CommonServiceProxy, private competencyService: CompetencyServiceProxy,) { }

  async ngOnInit() {
    this.employeeData.certifications = [];
    this.employeeData.skills = [];
    this.employeeData.qualifications = [];
    let subscription: Subscription = null;
    subscription = this.activatedRoute.paramMap.subscribe(params => {
      this.employeeId = parseInt(params.get('id'));

      // subscription.unsubscribe();
      // this.employeeService.fetch(this.employeeId).toPromise().then(response => {
      //   this.data = response;
      // })
    });
    this.fetchProfile();
    // this.fetchSinglePlan();
    this.fetchCompetencies();
    // this.getSuccessors();
    // this.getEmployeeSuccessionPlan();
  }

  goback() {
    this.navCtrl.back();
  }

  // async fetchSinglePlan(){
  //   const data = await this.successionService.getCareerSuccessionPlanById(this.employeeId).toPromise();
  //   if(!data.hasError){
  //     this.planDetails = data.result;
  //     this.competencyId = data.result.competencyId;
  //     this.employeeId = data.result.holderId;
  //     console.log('Yippeee',this.planDetails);
  //     console.log('Wowza',data.result.competencyId);
  //     this.fetchProfile();
  //     this.fetchCompetencies();
  //     this.getSuccessors();
  //   }
  // }


async fetchProfile(){
    this.employee.getEmployeeById(this.employeeId).subscribe(data => {
      if(!data.hasError){
        this.employeeData = new MyEmployeeDTO(data.result);
        this.certificationData = data.result.certifications
        this.experienceData = data.result.employmentHistories;
        this.skillsData = data.result.skills;
        this.qualificationData = data.result.qualifications;
        this.positionId = this.employeeData.positionId;
        console.log('My Details', this.employeeData);
        console.log('My Contract', this.employeeContractData);
        console.log('My position ID:',this.positionId )
        this.getEmployeeSuccessionPlan();
        this.getPlanSuccessors();
        this.pageLoading = false;
      }
    })
  }

  async getPlanSuccessors(){
    const data = await this.successor.getEmployeePossibleSuccessor(undefined,undefined,undefined,this.employeeId,this.competencyId,0,1,10).toPromise();
    if(!data.result){
      this.successionData = data.result;
      this.successorCount = data.totalRecord;
      console.log('My successors:',this.successionData)
    }
  }


  async getEmployeeSuccessionPlan(){
    const data = await this.planById.getCareerSuccessionPlan(undefined,undefined,undefined,this.employeeId,this.competencyId,0,1,10).toPromise();
    if(!data.hasError && data.totalRecord > 0){
      this.planData = data.result[0];
      this.planDataCounter = data.totalRecord;
      this.successionEmployeesData = data.result[0].successionEmployee;
      this.loading = false;
      console.log('My Data', this.successionEmployeesData)
    } else {
      this.planData = new CareerSuccessionDTO().clone();
    }
  }

  addPlan() {
    this.newPlan = true;
    // this.data.location_name
    // this.data.skills[0].point
  }

  newCandidate(){
    this.newSuccessor = true;
  }

  async createSuccessionPlan(){
    this.newSuccessionPlan.holderId = this.employeeId;
    this.newSuccessionPlan.positionId = this.positionId;
    const data = await this.succession.careerSuccession(this.newSuccessionPlan).toPromise();
    if(!data.hasError && data.result.isSuccessful == true){
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Plan created successfully', 'Dismiss').subscribe(dataAction => {
        if(dataAction){
          // this.fetchAllPlans();
         this.router.navigateByUrl('career-succession/planning');
          this.newPlan = false;
        }
      })
    }

    else {
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, 'Failed to create', 'Dismiss').subscribe(dataAction => {
        if(dataAction){
          // this.fetchAllPlans();
        //  this.router.navigateByUrl('career-succession/planning');
        this.newPlan = false;
        }
      })
    }
    }


    async addEmployeeToPlan(){
      this.updateSuccessionPlan.id = this.planData.id;
      this.updateSuccessionPlan.holderId = this.employeeId;
      this.updateSuccessionPlan.positionId = this.positionId;
      this.updateSuccessionPlan.planTitle = this.planData.title;
      this.updateSuccessionPlan.purpose = this.planData.purpose;
      this.updateSuccessionPlan.competencyId = this.planData.competencyId;
      // this.updateSuccessionPlan.readinessToStart = this.planData.readinessToStart;
      this.allCandidate.map(val => { val.dateCreated = new Date(); return val; });
      this.updateSuccessionPlan.stringSuccessionEmployee = JSON.stringify(this.allCandidate);
      const data = await this.succession.careerSuccession(this.updateSuccessionPlan).toPromise();
      if(!data.hasError && data.result.isSuccessful == true){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Candidate added successfully', 'Dismiss').subscribe(dataAction => {
          if(dataAction){
            // this.fetchAllPlans();
           this.router.navigateByUrl('career-succession/planning');
            this.newPlan = false;
          }
        })
      }

      else {
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, 'Failed to create', 'Dismiss').subscribe(dataAction => {
          if(dataAction){
            // this.fetchAllPlans();
          //  this.router.navigateByUrl('career-succession/planning');
          this.newPlan = false;
          }
        })
      }
      }

  fetchCompetencies(){
    this.competencyService.fetchCompetency(undefined,undefined,10,1).subscribe(data => {
      if(!data.hasError){
        this.allCompetencies = data.result;
        let counter = data.totalRecord;
        for(let i=0; i< counter; i++){
          // console.log(this.allCompetencies[i].id)
          // if(this.allCompetencies[i].competencyId =  this.competencyId) {
          //   this.roleCompetency = this.allCompetencies[i];
          //   console.log('Finally ooo', this.roleCompetency)
          // }
          break;
        }
        console.log('Here is the competence',this.roleCompetency)
      }
    })

  }

  cancelPlan(){}


  getSelectedEmployee(event,selectType) {
    console.log(event)
     if(selectType == 'employee'){
      this.newSuccessionPlan.holderId = event[0].id;
      this.newSuccessionPlan.positionId = event[0].employeeContractId;
     }
    //  if (selectType == 'relief') this.leaveReq.reliefOfficerStaffNo = event[0].employeeNumber;

     console.log(selectType, event)
  }

  getSuccessingCandidate(event,selectType) {
     if(selectType == 'employee'){
       this.allCandidate = event;
     }

     console.log(selectType, event)
  }
}
