import { TableColumn, TableAction, TableActionEvent } from 'app/components/tablecomponent/models';
import { Router } from '@angular/router';
import { AlertserviceService } from './../../../_services/alertservice.service';
import { title } from 'process';
import { GradeLevelServiceProxy, GradeLevelDTO, CompetencyDTO, Qualification, CompetencyRequirmentsDTO, CompetencyServiceProxy, ManageCompetencyDTO, DeleteBudgetServiceProxy } from './../../../_services/service-proxies';
import { Department, GetAllDepartmentsServiceProxy, DepartmentDTO, CommonServiceProxy, JobRole, DataServiceProxy, Certification, Skill, GetAllPositionsServiceProxy, PositionDTO } from 'app/_services/service-proxies';
import { Component, OnInit } from '@angular/core';


enum TABLE_ACTION {
  VIEW = '1',
  DELETECOMPETENCY = '3'
}
export interface competencyRequirement{
  ID?: number,
  requirementCategory?: string,
  skillId?: number,
  skillName?: string,
  trainingId?: number,
  trainingName?: string,
  certificationId?: number,
  certificationName?:string,
  qualificationId?: number,
  qualificationName?: string,
  experienceId?: any,
  experienceName?: any,
  abilityId?: number,
  abilityName?: string,
  experience?: string,
  YearsofExperience?: number,
}
@Component({
  selector: 'ngx-competency',
  templateUrl: './competency.component.html',
  styleUrls: ['./competency.component.scss']
})
export class CompetencyComponent implements OnInit {

  tableActions: TableAction[] = [
    {name: TABLE_ACTION.VIEW, label: 'View'},
    {name: TABLE_ACTION.DELETECOMPETENCY, label: 'Delete'},

  ]

  tableActionClicked(event: TableActionEvent){
    if(event.name==TABLE_ACTION.VIEW){
     this.router.navigateByUrl('/roles' + event.data.id)
      }

      else if(event.name==TABLE_ACTION.DELETECOMPETENCY){
      //  this.router.navigateByUrl('' + event.data.id)
      // alert(event.data.id)
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.CONFIRM, 'Do you want to Delete','Yes').subscribe(dataAction => {
        this.competencyService.deleteCompetency(event.data.id).subscribe(data => {
          if(!data.hasError){
           this.router.navigateByUrl('career-succession/competency')
          }
        })
      })
        }
 }

  myPlanHeader: string = 'Create Competency';
  myPlanDesc: string = 'Click the button below to add a competency';

  myButton: string = 'Create New';
  scoreCardClick: boolean = false;
  newCompetency: boolean = false;
  competencyCounter: number = 0;
  myPanel: string = '';

  selectedCase: string = 'Role';
  selectedPanel: any = { title: 'Role', label: 'Role', status: 'Active'};
  competencyChecklist = [
    { title: 'Role', label: 'Role', status: 'Active' },
    { title: 'Position', label: 'Position', status: 'Inactive' }
  ];

  requirementList = [
    { title: 'skill', label: 'Skills'},
    { title: 'training', label: 'Training'},
    { title: 'qualification', label: 'Qualification'},
    { title: 'certification', label: 'Certification'},
    { title: 'experience', label: 'General Experience'},

  ];

  competencyTable: TableColumn [] = [
    {name: 'competencyTitle', title: 'Competency Title'},
    // {name: 'departmentId', title: 'Department'},
    {name: 'description', title: 'Description'},

  ];

  comRequirement: competencyRequirement [] = [];


  allDepartments: DepartmentDTO [] = [];
  allJobRoles: JobRole [] = [];
  allGradeLevels: GradeLevelDTO [] = [];
  skillData: Skill [] = [];
  certificationData: Certification [] = [];
  qualificationData: Qualification [] = [];
  requirement: string = 'skill';
  allCompetencies: CompetencyDTO [] = [];
  myCompetency: ManageCompetencyDTO = new ManageCompetencyDTO().clone();
  allCompetencyRequirements: CompetencyRequirmentsDTO [] = [];
  competencyRequirement = new CompetencyRequirmentsDTO;
  addedRequirements: [] = [];
tempQualReq = [];
tempSkillReq = [];
tempCertReq = [];
tempTrainReq = [];
allPositions: PositionDTO [] = [];

  constructor(private department: GetAllDepartmentsServiceProxy, private commonService: CommonServiceProxy,
    private levels: GradeLevelServiceProxy, private dataService: DataServiceProxy, private positionService: GetAllPositionsServiceProxy,
    private competencyService: CompetencyServiceProxy, private alertMe: AlertserviceService, private router: Router,
    ) { }

  ngOnInit(): void {
    this.fetchAllDepartments();
    this.fetchAllJobRoles();
    this.fetchAllLevels();
    this.fetchCertifications();
    this.fetchQualifications();
    this.fetchSkills();
    this.getCompetency();
  }

  toggleRequirement(e:string){
    this.requirement = e;
  }

  async createCompetency(){
    this.myCompetency.selectedSkills = JSON.stringify(this.tempSkillReq);
    this.myCompetency.selectedCertifications = JSON.stringify(this.tempCertReq);
    this.myCompetency.selectedQualifications = JSON.stringify(this.tempQualReq);
    this.myCompetency.selectedAbilities = JSON.stringify(this.tempTrainReq);
    this.myCompetency.competencesRequirementsDTO = this.allCompetencyRequirements;
    const data = await this.competencyService.addUpdateCompetency(this.myCompetency).toPromise();
    if(!data.hasError){
      this.alertMe.openModalAlert('Success', 'Competency Added!', 'Dismiss')
      this.myCompetency = new ManageCompetencyDTO().clone();
    }
  }

  async getCompetency(){
    const data = await this.competencyService.fetchCompetency('',0,10,1).toPromise();
    if(!data.hasError){
      this.allCompetencies = data.result;
      this.competencyCounter = data.totalRecord;
      console.log('All competencies', this.allCompetencies)
    }
  }

  addRequirement(){
    let newRequirements = new CompetencyRequirmentsDTO;
    newRequirements.experience = JSON.stringify(this.competencyRequirement.experience);
    newRequirements.experienceWeight = this.competencyRequirement.experienceWeight;
    newRequirements.skillId = this.competencyRequirement.skillId;
    newRequirements.qualificationId = this.competencyRequirement.qualificationId;
    newRequirements.skillWeight = this.competencyRequirement.skillWeight;
    newRequirements.yearsofExperience = this.competencyRequirement.yearsofExperience;
    newRequirements.trainingId = this.competencyRequirement.trainingId;
    newRequirements.certificationId = this.competencyRequirement.certificationId;
    newRequirements.requirementCategory = this.competencyRequirement.requirementCategory;
    newRequirements.points = this.competencyRequirement.points;
    this.allCompetencyRequirements.push(newRequirements);
    if(this.competencyRequirement.skillId) this.tempSkillReq.push(newRequirements);
    if(this.competencyRequirement.trainingId) this.tempTrainReq.push(newRequirements);
    if(this.competencyRequirement.certificationId) this.tempCertReq.push(newRequirements);
    if(this.competencyRequirement.qualificationId) this.tempQualReq.push(newRequirements);
    console.log('Competency Added', this.competencyRequirement);
    console.log('Certification Added', this.tempCertReq);
    newRequirements = new CompetencyRequirmentsDTO;
  }

  addNewCompetency(){
    this.router.navigateByUrl('/career-succession/new-competency')
  }

  async fetchSkills(){
    const data = await this.commonService.getSkills().toPromise();
    if(!data.hasError){
      this.skillData = data.result;
      console.log('Skills:', this.skillData);
    }
  }

  async fetchCertifications(){
    const data = await this.commonService.getCertifications().toPromise();
    if(!data.hasError){
      this.certificationData = data.result;
      console.log('Certifications:', this.certificationData)
    }
  }

  async fetchQualifications(){
    const data = await this.commonService.getQualifications().toPromise();
    if(!data.hasError){
      this.qualificationData = data.result;
      console.log('qualification:', this.qualificationData)
    }
  }

  selectPanel(rolelist, i) {
    this.selectedPanel = rolelist;

    this.competencyChecklist.forEach(value => {
      value.status = 'Inactive';
    });
    this.competencyChecklist[i].status = 'Active';
    this.selectedCase = this.competencyChecklist[i].title;

  }

  async fetchAllDepartments(){
    const data = await this.department.getAllDepartments(10,1).toPromise();
    if(!data.hasError){
      this.allDepartments = data.result;
      console.log('All Departments:',this.allDepartments)
    }
  }

  async fetchAllLevels(){
    const data = await this.levels.getAllGradeLevel(10,1,1,1).toPromise();
    if(!data.hasError){
      this.allGradeLevels = data.result;
    }
  }

  async fetchAllJobRoles(){
    const data = await this.commonService.getJobRoles().toPromise();
    if(!data.hasError){
      this.allJobRoles = data.result;
      console.log('Yo boss', this.allJobRoles)
    }
  }

  async fetchAllPositions(){
    const data = await this.positionService.getAllPositions(1,10,0,0,0).toPromise();
    if(!data.hasError){
      this.allPositions = data.result;
      console.log('Yo boss', this.allPositions)
    }
  }

  toggleScoreCard(event) {
    this.scoreCardClick = !this.scoreCardClick;
  }

  updateCompetency(event:any){
    alert(event);
  }

  // deleteCompetency(event:any){
  //   alert(event)
  // }
}
