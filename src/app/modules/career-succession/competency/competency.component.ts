import { TableColumn, TableAction, TableActionEvent } from 'app/components/tablecomponent/models';
import { Router } from '@angular/router';
import { AlertserviceService } from './../../../_services/alertservice.service';
import { title } from 'process';
import { GradeLevelServiceProxy, GradeLevelDTO, CompetencyDTO, Qualification, CompetencyRequirmentsDTO, CompetencyServiceProxy, ManageCompetencyDTO, DeleteBudgetServiceProxy } from './../../../_services/service-proxies';
import { Department, GetAllDepartmentsServiceProxy, DepartmentDTO, CommonServiceProxy, JobRole, DataServiceProxy, Certification, Skill, GetAllPositionsServiceProxy, PositionDTO } from 'app/_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { result } from 'validate.js';


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
      this.updateComp = true;
      this.competencyService.fetchCompetency('',event.data.id, 10,1).subscribe(data => {
        if(!data.hasError){
          this.competencyData = data.result[0];
          this.allCompetencyRequirements = data.result[0].competencesRequirements;
          console.log('single data', this.competencyData)
          console.log('single requirement', this.allCompetencyRequirements)
        }
      })

      }

      else if(event.name==TABLE_ACTION.DELETECOMPETENCY){
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.CONFIRM, event.data.competencyTitle,'Yes').subscribe(dataAction => {
        if(dataAction){
          this.competencyService.deleteCompetency(event.data.id).subscribe(data => {
            if(!data.hasError){
              this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Successfully Deleted', 'Dismiss').subscribe(res => {
                this.getCompetency();
                this.router.navigateByUrl('career-succession/competency');
              })
            }
          })
        }
      })
        }
 }

  competencyData:CompetencyDTO = new CompetencyDTO().clone() ;
  updateComp: boolean = false;
  myPlanHeader: string = 'Create Competency';
  myPlanDesc: string = 'Click the button below to add a competency';

  myButton: string = 'Create New';
  scoreCardClick: boolean = false;
  newCompetency: boolean = false;
  competencyCounter: number = 0;
  myPanel: string = '';
  loading: boolean = false;

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
    {name: 'id', title: 'ID'},
    {name: 'competencyTitle', title: 'Competency Title'},
    {name: 'description', title: 'Description'},

  ];

  comRequirement: competencyRequirement [] = [];


  allDepartments: DepartmentDTO [] = [];
  allJobRoles: JobRole [] = [];
  allGradeLevels: GradeLevelDTO [] = [];
  skillData: Skill [] = [];
  btnProcessing: boolean = false;
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
  tempExp = [];
  allPositions: PositionDTO [] = [];

  filter = {
    CompetencyTitle: undefined,
    CompetencyId: undefined,
    PageSize: 10,
    PageNumber: 1
  }

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

  filterUpdated(filter: any) {
    this.filter = {...this.filter, ...filter};
    this.getCompetency()
  }

 createCompetency(){
    if(this.allCompetencyRequirements === []){
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, 'You need to add requirement','OK')
    } else {
    this.btnProcessing = true;
    this.myCompetency.selectedSkills = JSON.stringify(this.tempSkillReq);
    this.myCompetency.selectedCertifications = JSON.stringify(this.tempCertReq);
    this.myCompetency.selectedQualifications = JSON.stringify(this.tempQualReq);
    this.myCompetency.selectedAbilities = JSON.stringify(this.tempTrainReq);
    this.myCompetency.competencesRequirementsDTO = this.allCompetencyRequirements;
    this.competencyService.addUpdateCompetency(this.myCompetency).subscribe(data => {
      if(!data.hasError){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Competency Added!', 'OK').subscribe(res => {
          if(res === 'closed') this.router.navigateByUrl('career-succession/competency')
        })
        // this.myCompetency = new ManageCompetencyDTO().clone();
      } else {
        this.btnProcessing = false;
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, data.message, 'OK')
      }
    }, (error) => {
      if (error.status == 400) {
        this.btnProcessing = false;
        this.alertMe.openCatchErrorModal(this.alertMe.ALERT_TYPES.FAILED, error.title, "OK", error.errors);
      }
    });

    }
  }

getCompetency(){
    this.loading = true;
    this.competencyService.fetchCompetency(this.filter.CompetencyTitle,this.filter.CompetencyId,this.filter.PageSize,this.filter.PageNumber).subscribe(data => {
      this.loading = false;
      if(!data.hasError){
        this.allCompetencies = data.result;
        this.competencyCounter = data.totalRecord;
        console.log('All competencies', this.allCompetencies)
      }
    })

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

  removeRequirement(req,i){
    this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.CONFIRM, '', 'Yes').subscribe(res => {
      if(res){
        this.allCompetencyRequirements.splice(i, 1);
        if(req.skillId){
        var sPos =  this.tempSkillReq.findIndex(x=>x.skillId == req.skillId);
        if(sPos != -1){this.tempSkillReq.splice(sPos,1)}
        }
        if(req.trainingId){
        var sPos =  this.tempTrainReq.findIndex(x=>x.trainingId == req.trainingId);
        if(sPos != -1){this.tempTrainReq.splice(sPos,1)}
        }
        if(req.certificationId){
        var sPos =  this.tempCertReq.findIndex(x=>x.certificationId == req.certificationId);
        if(sPos != -1){this.tempCertReq.splice(sPos,1)}
        }
        if(req.qualificationId){
        var sPos =  this.tempQualReq.findIndex(x=>x.qualificationId == req.qualificationId);
        if(sPos != -1){this.tempQualReq.splice(sPos,1)}
        }
        if(req.experience){
        var sPos =  this.tempExp.findIndex(x=>x.experience == req.experience);
        if(sPos != -1){this.tempExp.splice(sPos,1)}
        }
      }
    })
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
}
