import { CommunicationServiceProxy, MailTemplateDTO, CommonServiceProxy } from 'app/_services/service-proxies';
import { AlertserviceService } from './../../../../_services/alertservice.service';
import { RecruitmentSettingServiceProxy, ManageHireStageDTO, HireStageDTO, RecruitmentScoreCardDTO, ManageRecruitmentScoreCardDTO, ScoreCardQuestion, SubHireStageDTO, QuestionDTO, QuestionOptionDTO, RecruitmentScoreCard, ScoringType, ManageSubHireStageDTO } from './../../../../_services/service-proxies';
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

  multiChoice: QuestionOptionDTO[] = [];
  scoreCardClick: boolean = false;
  newTemplate: boolean = false;
  emailResponder;
  newStage: boolean = false;
  allowmultipleselection: boolean = false;
  selectionHeader: string = "Select Employee";
  addbtnText: string = "Add Employee";
  stagesModel: ManageHireStageDTO = new ManageHireStageDTO;
  scoreCardModel: ManageRecruitmentScoreCardDTO = new ManageRecruitmentScoreCardDTO;
  questionModel: ScoreCardQuestion = new ScoreCardQuestion();
  questionBank: ScoreCardQuestion [] = [];
  hiringStages: HireStageDTO [] = [];
  hireStage: HireStageDTO = new HireStageDTO();
  subHireStage: SubHireStageDTO = new SubHireStageDTO();
  allSubHireStages: SubHireStageDTO [] = [];
  allScorecards: RecruitmentScoreCard [] = [];
  allTemplates: MailTemplateDTO [] = [];
  scoringTypes: ScoringType [] = [];
  scorecardCounter: number = 0
  templateCounter: number = 0;
  hiringStageCounter: number = 0;
  loading: boolean = false;
  btnProcessing: boolean = false;
  newSubStage: boolean = false;
  hirestageId: number = 0;
  substageModel: ManageSubHireStageDTO = new ManageSubHireStageDTO();



  constructor( private settings: RecruitmentSettingServiceProxy, private alertMe: AlertserviceService,
    private template: CommunicationServiceProxy, private commonService: CommonServiceProxy) { }

  ngOnInit(): void {
    this.getHireStages();
    this.fetchAllScorecards();
    this.getAllTemplates();
    this.fetchScoringType();
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
  }

  toggleScorecard(){
    this.scorecard = true;
  }

  toggleNewTemplate(){
    this.newTemplate = true;
  }

  addNewStage(){
    this.btnProcessing = true;
    this.settings.addUpdateHireStage(this.stagesModel).subscribe(data => {
      this.btnProcessing = false;
      if(!data.hasError){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Stage Added!','Dismiss').subscribe(res => {
          if(res){
            this.createStage = false;
            this.stagesModel = new ManageHireStageDTO();
            this.getHireStages();
          }
        })
      }
    }, (error) => {

      if (error.status == 400) {
        this.alertMe.openCatchErrorModal(this.alertMe.ALERT_TYPES.FAILED, error.title, "OK", error.errors);
      }
    })
  }

  toggleSubStage(id){
    this.hirestageId = id;
    this.newSubStage = !this.newStage

  }

  addMoreQuestion(){
    this.questionBank.push(this.questionModel);
    console.log(this.questionModel);
    this.questionModel = new ScoreCardQuestion().clone();

  }

  removeQuestion(question){
    this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.CONFIRM, '', 'Yes').subscribe(res => {
      if(res){
       for( var i = 0; i < this.questionBank.length; i++){
         if (this.questionBank[i] === question) {
           this.questionBank.splice(i, 1);
             i--;
         }
     }
      }
    })
   }

  addScoreCard(){
    this.btnProcessing = true;
    this.settings.addUpdateScoreCard(this.scoreCardModel).subscribe(data => {
      this.btnProcessing = false;
      if(!data.hasError){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Scorecard Added!','Dismiss').subscribe(res => {
          if(res){
            this.fetchAllScorecards();
            this.scorecard = false;
          }
        })
      }
    })
  }

  async fetchAllScorecards(){
    const data = await this.settings.getRecruitmentScoreCards().toPromise();
    if(!data.hasError){
      this.allScorecards = data.result;
      this.scorecardCounter = data.totalRecord;
    }
  }

  deleteScorecard(id){
    alert(id)
    this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.CONFIRM, 'Are you sure', 'Yes').subscribe(res =>{
      if(res){
        this.settings.deleteScoreCard(id).subscribe(data => {
          if(!data.hasError){
            this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Deleted', 'Dismiss').subscribe(newres => {
              if(newres){
                this.fetchAllScorecards();
              }
            })
          }
        })
      }
    })
  }

  async fetchScoringType(){
    const data = await this.commonService.getScoringType().toPromise();
    if(!data.hasError){
      this.scoringTypes = data.result;
    }
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
    this.newStage = !this.newStage;
  }

  addScorecard() {

  }

  async getAllTemplates(){
    const data = await this.template.getAllEmailTemplates().toPromise();
    if(!data.hasError){
      this.allTemplates = data.result;
      this.templateCounter = data.totalRecord;
    }
  }

  async getHireStages(){
    const data = await this.settings.getAllHireStages().toPromise();
    if(!data.hasError){
      this.hiringStages = data.result;
      this.hiringStageCounter = data.totalRecord;
    }
  }

  async getSingleHireStage(){
    const data = await this.settings.getHireStage(1).toPromise();
    if(!data.hasError){
      this.hireStage = data.result;
      this.allSubHireStages = data.result.subStages;
    }
  }

  async getSingleSubHireStage(){
    const data = await this.settings.getSubHireStage(1).toPromise();
    if(!data.hasError){
      this.subHireStage = data.result;
    }
  }

  addSubStage(){
    this.btnProcessing = true;
    this.substageModel.hireStageId = this.hirestageId;
    this.settings.addUpdateSubHireStage(this.substageModel).subscribe(data => {
      this.btnProcessing = false;
      if(!data.hasError){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Substage Added', 'OK').subscribe(res => {
          if(res){
            this.getHireStages();
          }
        })
      }
    })
  }

  getSelectedEmployee(event,selectType) {
    if(selectType == 'employee'){
     this.stagesModel.reviewers = event[0].employeeNumber;
    }
 }

 getSubSelectedEmployee(event,selectType) {
  if(selectType == 'employee'){
   this.substageModel.reviewers = event[0].employeeNumber;
  }
}

  showModal(){
      this.showEditModal = true
  }
}
