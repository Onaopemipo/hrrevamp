import { competencyRequirement } from './../competency/competency.component';
import { DataServiceProxy, GetAllDepartmentsServiceProxy, GradeLevelServiceProxy, CommonServiceProxy, DepartmentDTO, JobRole, Skill, Certification, Competency } from 'app/_services/service-proxies';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { CompetencyRequirmentsDTO, CompetencyServiceProxy, GradeLevelDTO, Qualification, ManageCompetencyDTO } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-new-competency',
  templateUrl: './new-competency.component.html',
  styleUrls: ['./new-competency.component.scss']
})
export class NewCompetencyComponent implements OnInit {


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
    { title: 'experience', label: 'Experience'},

  ];

  comRequirement: competencyRequirement [] = [];


  allDepartments: DepartmentDTO [] = [];
  allJobRoles: JobRole [] = [];
  allGradeLevels: GradeLevelDTO [] = [];
  skillData: Skill [] = [];
  certificationData: Certification [] = [];
  qualificationData: Qualification [] = [];
  requirement: string = 'skill';
  allCompetencies: Competency [] = [];
  myCompetency: ManageCompetencyDTO = new ManageCompetencyDTO().clone();
  allCompetencyRequirements: CompetencyRequirmentsDTO [] = [];
  competencyRequirement = new CompetencyRequirmentsDTO;
  addedRequirements: [] = [];
tempQualReq = [];
tempSkillReq = [];
tempCertReq = [];
tempTrainReq = [];

  constructor(private department: GetAllDepartmentsServiceProxy, private commonService: CommonServiceProxy,
    private levels: GradeLevelServiceProxy, private dataService: DataServiceProxy,
    private competencyService: CompetencyServiceProxy, private alertMe: AlertserviceService) { }

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

  removeRequirement(){
    alert('Deleted!')
  }

  async createCompetency(){
    this.myCompetency.selectedSkills = JSON.stringify(this.tempSkillReq);
    this.myCompetency.selectedCertifications = JSON.stringify(this.tempCertReq);
    this.myCompetency.selectedQualifications = JSON.stringify(this.tempQualReq);
    this.myCompetency.selectedAbilities = JSON.stringify(this.tempTrainReq);
    this.myCompetency.competencesRequirementsDTO = this.allCompetencyRequirements;
    const data = await this.competencyService.addUpdateCompetency(this.myCompetency).toPromise();
    if(!data.hasError){
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Competency Added!', 'Dismiss').subscribe(data => {
        if(data == 'closed'){
          this.myCompetency = new ManageCompetencyDTO().clone();
        }
      })
      this.myCompetency = new ManageCompetencyDTO().clone();
      this.competencyRequirement = new CompetencyRequirmentsDTO().clone();
    }
  }

  async getCompetency(){
    const data = await this.commonService.getCompetency().toPromise();
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
    console.log('Cert', this.tempCertReq);
    this.competencyRequirement = new CompetencyRequirmentsDTO().clone();
  }

  addNew(){
    this.newCompetency = !true;
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

  toggleScoreCard(event) {
    this.scoreCardClick = !this.scoreCardClick;
  }

  updateCompetency(){

  }

  deleteCompetency(){

  }

}
