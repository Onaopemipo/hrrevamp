import { GradeLevelServiceProxy, GradeLevelDTO } from './../../../_services/service-proxies';
import { Department, GetAllDepartmentsServiceProxy, DepartmentDTO, CommonServiceProxy, JobRole } from 'app/_services/service-proxies';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-competency',
  templateUrl: './competency.component.html',
  styleUrls: ['./competency.component.scss']
})
export class CompetencyComponent implements OnInit {

  myPlanHeader: string = 'Create Competency';
  myPlanDesc: string = 'Click the button below to add a competency';

  myButton: string = 'Create New';
  scoreCardClick: boolean = false;
  newRole: boolean = false;
  myPanel: string = '';
  selectedCase: string = 'Role_Details';
  selectedPanel: any = { title: 'Role_Details', label: 'Role Details', status: 'Active'};
  competencyChecklist = [
    { title: 'Role', label: 'Role', status: 'Active' },
    { title: 'Position', label: 'Position', status: 'Inactive' }
  ];

  allDepartments: DepartmentDTO [] = [];
  allJobRoles: JobRole [] = [];
  allGradeLevels: GradeLevelDTO [] = [];

  constructor(private department: GetAllDepartmentsServiceProxy, private commonService: CommonServiceProxy,private levels: GradeLevelServiceProxy) { }

  ngOnInit(): void {
    this.fetchAllDepartments();
    this.fetchAllJobRoles();
    this.fetchAllLevels();
  }

  addNewRole(){
    this.newRole = !this.newRole;
  }

  addExperience(){

  }

  fetchExperience(){

  }



  addSkills(){

  }

  fetchSkills(){

  }

  addCertification(){

  }

  fetchCertifications(){

  }

  addQualification(){

  }

  fetchQualifications(){

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

  addRole(){

  }

  addCadre(){

  }

}
