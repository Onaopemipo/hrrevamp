import { Contacts } from './../../../@core/data/users';
import { AlertserviceService } from './../../../_services/alertservice.service';
import { EmployeeCertification } from './../services/employees.service';
import { Certification, CommonServiceProxy, CompetencyRequirmentsDTO } from 'app/_services/service-proxies';
import { map } from 'rxjs/operators';
import { FetchEmployeeByIdServiceProxy, EmployeeDTO, EmployeeContractAssignmentDTO, FetchAllEmployeesServiceProxy, GetCareerSuccesionPlanByIdServiceProxy, CareerSuccessionDTO, EmployeeCertificationDTO, EmployeeHistoryDTO, EmployeeSkillDTO, EmployeeQualificationDTO, ManageCareerSuccessionDto, CareerSuccessionServiceProxy } from './../../../_services/service-proxies';
import { TableColumn } from './../../../components/tablecomponent/models';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmployeesService, MyEmployeeDatail, } from '../services/employees.service';
import { throwIfAlreadyLoaded } from 'app/@core/module-import-guard';


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

  allPurposes = [
    {name: 'retirement', title: 'Retirement'},
    {name: 'firing', title: 'Firing'},
    {name: 'changeofposition', title: 'Change of Position'},
    {name: 'exit', title: 'Exit'},
  ]

  allowmultipleselection: boolean = false;
  selectionHeader: string = "Select Employee";
  addbtnText: string = "Add Employee";

  employeeData: MyEmployeeDTO = new MyEmployeeDTO;
  employeeContractData: EmployeeContractAssignmentDTO = new EmployeeContractAssignmentDTO
  planId: number = 0;
  employeeId:number = 0;
  planStatus: boolean = false;
  competencyId: number = 0;
  newPlan: boolean = false;
  allCompetencies: CompetencyRequirmentsDTO [] = [];
  roleCompetency: CompetencyRequirmentsDTO = new CompetencyRequirmentsDTO;
  planDetails: CareerSuccessionDTO = new CareerSuccessionDTO;
  pageLoading:boolean = true;
  planData: CareerSuccessionDTO = new CareerSuccessionDTO();
  certificationData: EmployeeCertificationDTO [] = [];
  experienceData: EmployeeHistoryDTO [] = [];
  skillsData: EmployeeSkillDTO [] = [];
  qualificationData: EmployeeQualificationDTO [] = [];
  newSuccessionPlan: ManageCareerSuccessionDto = new ManageCareerSuccessionDto;


  constructor(private navCtrl: Location, private alertMe: AlertserviceService,
    private activatedRoute: ActivatedRoute,private succession: CareerSuccessionServiceProxy,
    private employeeService: EmployeesService, private employee: FetchEmployeeByIdServiceProxy,
    private allEmployees: FetchAllEmployeesServiceProxy, private router: Router,
    private successionService: GetCareerSuccesionPlanByIdServiceProxy,
    private commonService: CommonServiceProxy) { }

  async ngOnInit() {
    this.employeeData.certifications = [];
    this.employeeData.skills = [];
    this.employeeData.qualifications = [];
    let subscription: Subscription = null;
    subscription = this.activatedRoute.paramMap.subscribe(params => {
      this.planId = parseInt(params.get('id'));

      // subscription.unsubscribe();
      // this.employeeService.fetch(this.employeeId).toPromise().then(response => {
      //   this.data = response;
      // })
    });
    // this.fetchAllEmployees();
    this.fetchProfile();
    this.fetchSinglePlan();
    this.fetchCompetencies();
  }

  goback() {
    this.navCtrl.back();
  }

  async getSingleSuccession(){
    const data = await this.successionService.getCareerSuccessionPlanById(this.planId).toPromise();
    if(!data.hasError){
      this.planData = data.result;
    }
  }

async fetchProfile(){
    this.employee.getEmployeeById(this.planId).subscribe(data => {
      if(!data.hasError){
        this.employeeData = new MyEmployeeDTO(data.result);
        this.certificationData = data.result.certifications
        this.experienceData = data.result.employmentHistories;
        this.skillsData = data.result.skills;
        this.qualificationData = data.result.qualifications;
        console.log('My Details', this.employeeData);
        console.log('My Contract', this.employeeContractData);
        this.pageLoading = false;
      }
    })
  }

  addPlan() {
    this.newPlan = true;
    // this.data.location_name
    // this.data.skills[0].point
  }

  async fetchSinglePlan(){
    const data = await this.successionService.getCareerSuccessionPlanById(this.planId).toPromise();
    if(!data.hasError){
      this.planDetails = data.result;
      this.competencyId = data.result.competencyId;
      this.employeeId = data.result.holderId;
      console.log('Yippeee',this.planDetails);
      console.log('Wowza',data.result.competencyId);
      this.fetchProfile();
      this.fetchCompetencies();
    }
  }

  async createSuccessionPlan(){
    this.newSuccessionPlan.holderId = this.planId;
    this.newSuccessionPlan.positionId = this.employeeData.positionId;
    const data = await this.succession.careerSuccession(this.newSuccessionPlan).toPromise();
    if(!data.hasError){
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Plan created successfully', 'Dismiss').subscribe(dataAction => {
        if(dataAction){
          // this.fetchAllPlans();
         this.router.navigateByUrl('career-succession/planning');
          this.newPlan = false;
        }
      })
    }
    }

  fetchCompetencies(){
    this.commonService.getCompetency().subscribe(data => {
      if(!data.hasError){
        this.allCompetencies = data.result;
        let counter = data.totalRecord;
        for(let i=0; i< counter; i++){
          // console.log(this.allCompetencies[i].id)
          if(this.allCompetencies[i].competencyId =  this.competencyId) {
            this.roleCompetency = this.allCompetencies[i];
            console.log('Finally ooo', this.roleCompetency)
          }
          break;
        }
        console.log('Here is the competence',this.roleCompetency)
      }
    })

  }


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
    console.log(event)
     if(selectType == 'employee')this.newSuccessionPlan.stringSuccessionEmployee = event[0].employeeNumber;
    //  if (selectType == 'relief') this.leaveReq.reliefOfficerStaffNo = event[0].employeeNumber;

     console.log(selectType, event)
  }
}
