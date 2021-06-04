import { AlertserviceService } from 'app/_services/alertservice.service';
import { RecruitmentJobApplicationServiceProxy, RecruitmentScoreCardDTO, RecruitmentSettingServiceProxy, SaveApplicantScoreCardDto, ScoringTypeDto, ScoringTypeServiceProxy } from './../../../../_services/service-proxies';
import { TableColumn } from './../../../../components/tablecomponent/models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {

  myApplicantTable: TableColumn [] = [
    {name: 'coreFocus', title: 'Core Focus Area'},
    {name: 'scoringType', title: 'Scoring Type'},
    {name: 'comment', title: 'Comments'}];

    applicant: SaveApplicantScoreCardDto = new SaveApplicantScoreCardDto();
    scoringTypeData: ScoringTypeDto [] = [];

    scorecardData: RecruitmentScoreCardDTO = new RecruitmentScoreCardDTO().clone();
  constructor(private scorecard: RecruitmentSettingServiceProxy, private score: ScoringTypeServiceProxy,
    private evaluation: RecruitmentJobApplicationServiceProxy,
    private alertMe: AlertserviceService) { }

  ngOnInit(): void {
  }

  getScorecard(){
    this.scorecard.getRecruitmentScoreCard(0).subscribe(data => {
      if(!data.hasError){
        this.scorecardData = data.result;
      }
    })
  }

  saveScorecard(){
    this.evaluation.saveApplicantScoreCard(this.applicant).subscribe(data => {
      if(!data.hasError){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Success', 'Dismiss')
      }
    })
  }

  async fetchScoringType(){
    const data = await this.score.getAllScoringType().toPromise();
    if(!data.hasError){
      this.scoringTypeData = data.result;
    }
  }
}
