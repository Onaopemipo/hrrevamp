import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { competencyRequirement } from './../competency/competency.component';
import { DataServiceProxy, GetAllDepartmentsServiceProxy, GradeLevelServiceProxy, CommonServiceProxy, DepartmentDTO, JobRole, Skill, Certification, } from 'app/_services/service-proxies';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { CompetencyRequirmentsDTO, CompetencyServiceProxy, GradeLevelDTO, Qualification, ManageCompetencyDTO } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-new-competency',
  templateUrl: './new-competency.component.html',
  styleUrls: ['./new-competency.component.scss']
})
export class NewCompetencyComponent implements OnInit {


  comForm: NgForm;
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
  allCompetencies: CompetencyRequirmentsDTO [] = [];
  myCompetency: ManageCompetencyDTO = new ManageCompetencyDTO().clone();
  allCompetencyRequirements: CompetencyRequirmentsDTO [] = [];
  competencyRequirement = new CompetencyRequirmentsDTO;
  addedRequirements: [] = [];
  tempQualReq = [];
  tempSkillReq = [];
  tempCertReq = [];
  tempTrainReq = [];
  tempExp = [];
  requirementChecker:boolean = false;

  constructor(private department: GetAllDepartmentsServiceProxy, private commonService: CommonServiceProxy,
    private levels: GradeLevelServiceProxy, private dataService: DataServiceProxy,
    private competencyService: CompetencyServiceProxy, private alertMe: AlertserviceService, private router: Router) { }

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

  // async createCompetency(){
  //   this.myCompetency.selectedSkills = JSON.stringify(this.tempSkillReq);
  //   this.myCompetency.selectedCertifications = JSON.stringify(this.tempCertReq);
  //   this.myCompetency.selectedQualifications = JSON.stringify(this.tempQualReq);
  //   this.myCompetency.selectedAbilities = JSON.stringify(this.tempTrainReq);
  //   this.myCompetency.competencesRequirementsDTO = this.allCompetencyRequirements;
  //   const data = await this.competencyService.addUpdateCompetency(this.myCompetency).toPromise();
  //   if(!data.hasError){
  //     this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Competency Added!', 'Dismiss').subscribe(data => {
  //       if(data == 'closed'){
  //         this.myCompetency = new ManageCompetencyDTO().clone();
  //       }
  //     })
  //     this.myCompetency = new ManageCompetencyDTO().clone();
  //     this.competencyRequirement = new CompetencyRequirmentsDTO().clone();
  //     this.allCompetencyRequirements = [];
  //   }
  //   else {
  //     this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, '', 'Dismiss')
  //   }
  // }

  async createCompetency(){
    if(this.allCompetencyRequirements === []){
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, 'You need to add requirement','Dismiss')
    } else {

    this.myCompetency.selectedSkills = JSON.stringify(this.tempSkillReq);
    this.myCompetency.selectedCertifications = JSON.stringify(this.tempCertReq);
    this.myCompetency.selectedQualifications = JSON.stringify(this.tempQualReq);
    this.myCompetency.selectedAbilities = JSON.stringify(this.tempTrainReq);
    this.myCompetency.competencesRequirementsDTO = this.allCompetencyRequirements;
    const data = await this.competencyService.addUpdateCompetency(this.myCompetency).toPromise();
    if(!data.hasError){
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Competency Added!', 'Dismiss').subscribe(res => {
        if(res === 'closed') this.router.navigateByUrl('career-succession/competency')
      })
      // this.myCompetency = new ManageCompetencyDTO().clone();
    } else {
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, data.message, 'Dismiss')
    }

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

  async checkRequirment(){
    if(this.tempSkillReq.length < 1 || this.tempCertReq.length < 1 || this.tempSkillReq.length < 1 || this.tempTrainReq.length < 1 ){
      this.requirementChecker = false
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
    // this.allCompetencyRequirements.push(newRequirements);
    if(this.competencyRequirement.skillId){
      var DuplicateChk = this.allCompetencyRequirements.find(x=> x.skillId == newRequirements.skillId);
      console.log('all req', this.allCompetencyRequirements)
      if(DuplicateChk){
        console.log('my dup',DuplicateChk);
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, 'Duplicate exists', 'Dismiss')
      } else {
        newRequirements.skillName = this.skillData.find(s=>s.id == this.competencyRequirement.skillId).name;
        this.tempSkillReq.push(newRequirements);
        this.allCompetencyRequirements.push(newRequirements)
      }
    }
    else if(this.competencyRequirement.trainingId){
      var DuplicateChk = this.allCompetencyRequirements.find(x=> x.trainingId == newRequirements.trainingId);
      console.log('all req', this.allCompetencyRequirements)
      if(DuplicateChk){
        console.log('my dup',DuplicateChk);
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, 'Duplicate exists', 'Dismiss')
      } else {

        this.tempTrainReq.push(newRequirements);
        this.allCompetencyRequirements.push(newRequirements)
      }
    }

    else if(this.competencyRequirement.certificationId){
      var DuplicateChk = this.allCompetencyRequirements.find(x=> x.certificationId == newRequirements.certificationId);
      console.log('all req', this.allCompetencyRequirements)
      if(DuplicateChk){
        console.log('my dup',DuplicateChk);
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, 'Duplicate exists', 'Dismiss')
      } else {
        newRequirements.certificationName = this.certificationData.find(s=>s.id == this.competencyRequirement.certificationId).name;
        this.tempCertReq.push(newRequirements);
        this.allCompetencyRequirements.push(newRequirements)
      }
    }

    else if(this.competencyRequirement.qualificationId){
      var DuplicateChk = this.allCompetencyRequirements.find(x=> x.qualificationId == newRequirements.qualificationId);

      if(DuplicateChk){
        console.log('my dup',DuplicateChk,this.allCompetencyRequirements,newRequirements);
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, 'Duplicate exists', 'Dismiss')
      } else {
        newRequirements.qualificationName = this.qualificationData.find(s=>s.id == this.competencyRequirement.qualificationId).name;
        this.tempQualReq.push(newRequirements);
        this.allCompetencyRequirements.push(newRequirements)
      }
    }

    else if(this.requirement =='experience'){
      var DuplicateChk = this.allCompetencyRequirements.find(x=> x.experience == newRequirements.experience);

      if(DuplicateChk){
        console.log('my dup',DuplicateChk,this.allCompetencyRequirements,newRequirements);
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, 'Duplicate exists', 'Dismiss')
      } else {
        this.tempExp.push(newRequirements);
        this.allCompetencyRequirements.push(newRequirements)
      }
    }
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

}
