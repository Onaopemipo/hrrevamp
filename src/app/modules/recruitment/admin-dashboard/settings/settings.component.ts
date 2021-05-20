import { AlertserviceService } from './../../../../_services/alertservice.service';
import { RecruitmentSettingServiceProxy, ManageHireStageDTO, RecruitmentScoreCardDTO, ManageRecruitmentScoreCardDTO, ScoreCardQuestion } from './../../../../_services/service-proxies';
import { NbTabComponent } from '@nebular/theme';
import { Component, OnInit } from '@angular/core';
import { truncateSync } from 'fs';

@Component({
  selector: 'ngx-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  selectedOption: string = '';
  showEditModal = false
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
  scorecard:boolean = false;
  selectedCase: string = '';
  selectedPanel: any = { title: 'Hiring_Stages', label: 'Hiring Stages', status: 'Active'};
  hiringChecklist = [
    { title: 'Hiring_Stages', label: 'Hiring Stages', status: 'Active' },
    { title: 'EmailSms_Templates', label: 'Email/SMS Templates', status: 'Inactive' },
    { title: 'Evaluation', label: 'Evaluation', status: 'Inactive' }

  ];

  scoreCardClick: boolean = false;
  newTemplate: boolean = false;
  emailResponder;
  newStage: boolean = false;
  allowmultipleselection: boolean = false;
  selectionHeader: string = "Select Employee";
  addbtnText: string = "Add Employee";
  stagesModel: ManageHireStageDTO = new ManageHireStageDTO;
  scoreCardModel: ManageRecruitmentScoreCardDTO = new ManageRecruitmentScoreCardDTO;
  questionModel: ScoreCardQuestion = new ScoreCardQuestion;
  questionBank: ScoreCardQuestion [] = [];


  constructor( private settings: RecruitmentSettingServiceProxy, private alertMe: AlertserviceService) { }

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

  createNewStage(){
    this.createStage = !this.createStage;
    this.createTemplate = !this.createTemplate;
    // this.selectedCase = 'Hiring_Stages';
  }

  toggleScorecard(){
    this.scorecard = true;
  }

  toggleNewTemplate(){
    this.newTemplate = true;
  }

  addNewStage(){
    this.settings.addUpdateHireStage(this.stagesModel).subscribe(data => {
      if(!data.hasError){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Stage Added!','Dismiss')
      }
    })
  }

  addMoreQuestion(){
    this.questionBank.push(this.questionModel);
    this.questionModel = new ScoreCardQuestion().clone();
  }

  addScoreCard(){
    this.settings.addUpdateScoreCard(this.scoreCardModel).subscribe(data => {
      if(!data.hasError){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Scorecard Added!','Dismiss')
      }
    })
  }

  createNewTemplate() {
    this.createStage = !this.createStage;
    this.createTemplate = !this.createTemplate;
    // this.selectedCase = 'EmailSms_Templates';
  }

  toggleCard(panelTitle) {
    this.cardClick = panelTitle;
    console.log(panelTitle);
  }

  autoEmail(){

  }

  toggleScoreCard(event) {
    this.scoreCardClick = !this.scoreCardClick;
  }

  ggdg(tab: NbTabComponent) {
    console.log(tab);
  }

  addStage() {
    this.newStage = true;
  }

  addTemplate() {

  }

  addScorecard() {

  }

  getAllTemplates(){

  }

  getSelectedEmployee(event,selectType) {
    if(selectType == 'employee'){
     this.stagesModel.reviewers = event[0].employeeNumber;
    }
 }

  showModal(){
      this.showEditModal = true
  }
}
