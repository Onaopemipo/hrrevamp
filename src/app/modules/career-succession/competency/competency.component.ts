import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-competency',
  templateUrl: './competency.component.html',
  styleUrls: ['./competency.component.scss']
})
export class CompetencyComponent implements OnInit {

  myPlanHeader: string = 'Add a Role';
  myPlanDesc: string = 'You will be able to set competenies after adding a role.';

  myButton: string = 'Add a Role';
  scoreCardClick: boolean = false;
  newRole: boolean = false;
  myPanel: string = '';
  selectedCase: string = 'Role_Details';
  selectedPanel: any = { title: 'Role_Details', label: 'Role Details', status: 'Active'};
  competencyChecklist = [
    { title: 'Role', label: 'Role', status: 'Active' },
    { title: 'Position', label: 'Position', status: 'Inactive' }
  ];
  constructor() { }

  ngOnInit(): void {
  }

  addNewRole(){
    this.newRole = !this.newRole;
  }

  selectPanel(rolelist, i) {
    this.selectedPanel = rolelist;

    this.competencyChecklist.forEach(value => {
      value.status = 'Inactive';
    });
    this.competencyChecklist[i].status = 'Active';
    this.selectedCase = this.competencyChecklist[i].title;

  }

  toggleScoreCard(event) {
    this.scoreCardClick = !this.scoreCardClick;
  }

  addRole(){

  }

  addCadre(){

  }

}
