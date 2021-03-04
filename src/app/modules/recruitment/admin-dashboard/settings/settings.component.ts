import { NbTabComponent } from '@nebular/theme';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  cardClick: string = '';
  cardTitle = [
    {title: 'applied', value: false},
    {title: 'shortlisted', value: false},
    {title: 'interviewed', value: false},
    {title: 'hired', value: false},
    {title: 'pending', value: false},
  ];
  createStage: boolean = true;
  createTemplate: boolean = true;
  selectedCase: string = '';
  selectedPanel: any = { title: 'Hiring_Stages', label: 'Hiring Stages', status: 'Active'};
  hiringChecklist = [
    { title: 'Hiring_Stages', label: 'Hiring Stages', status: 'Active' },
    { title: 'EmailSms_Templates', label: 'Email/SMS Templates', status: 'Inactive' },
    { title: 'Evaluation', label: 'Evaluation', status: 'Inactive' }

  ];

  scoreCardClick: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  selectPanel(hiringlist, i) {
    this.selectedPanel = hiringlist;

    this.hiringChecklist.forEach(value => {
      value.status = 'Inactive';
    });
    this.hiringChecklist[i].status = 'Active';
    this.selectedCase = this.hiringChecklist[i].title;
  }

  createNew() {
    this.createStage = !this.createStage;
    this.createTemplate = !this.createTemplate;
  }

  toggleCard(panelTitle) {
    this.cardClick = panelTitle;
    console.log(panelTitle);
  }

  toggleScoreCard(event) {
    this.scoreCardClick = !this.scoreCardClick;
  }

  ggdg(tab: NbTabComponent) {
    console.log(tab);
  }

  addStage() {

  }

  addTemplate() {

  }

  addScorecard() {

  }

}
