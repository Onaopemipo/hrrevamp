import { AlertserviceService } from 'app/_services/alertservice.service';
import { IDTextViewModel } from 'app/_services/service-proxies';
import { RecruitmentQuizServiceProxy, ManageQuizDTO, QuestionDTO, QuestionOptionDTO } from './../../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-newquiz',
  templateUrl: './newquiz.component.html',
  styleUrls: ['./newquiz.component.scss']
})
export class NewquizComponent implements OnInit {

  optionTypes = [
    {id: 0, label: 'Multiple Choice'},
    {id: 1, label: 'True/False'},
    {id: 2, label: 'Long Text'},
    {id: 3, label: 'Description'},
  ]
  multiChoice = [
    {id: 0, label: 'A', value:''},
    {id: 1, label: 'B', value:''},
    {id: 2, label: 'C', value:''},
    {id: 3, label: 'D', value:''},
  ];
  booleanChoice = [
    { id: 0, label: 'A', value: 'True'},
    { id: 1, label: 'B', value: 'False'},
];

myOptionType: number = 0;

  pagetitle: string = 'Add Quiz';
  newQuizModel: ManageQuizDTO = new ManageQuizDTO();
  allQuizTypes: IDTextViewModel [] = [];
  allQuestionTypes: IDTextViewModel [] = [];
  allQuestions: QuestionDTO [] = [];
  questionModel: QuestionDTO = new QuestionDTO();
  questionOptionModel: QuestionOptionDTO = new QuestionOptionDTO();
  constructor(private quiz: RecruitmentQuizServiceProxy,private alertMe: AlertserviceService,) { }

  ngOnInit(): void {
    this.fetchQuestionTypes;
    this.fetchQuizTypes;

  }

  onChange(event){
    this.myOptionType = event;
  }

  addNewQuiz() {
    this.quiz.addUpdateQuiz(this.newQuizModel).subscribe(data => {
      if(!data.hasError){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Quiz Added!', 'Dismiss');
      }
    });
  }

  async fetchQuizTypes(){
    const data = await this.quiz.getQuizTypes().toPromise();
    if(!data.hasError){
      this.allQuizTypes = data.result;
    }
  }

  async fetchQuestionTypes(){
    const data = await this.quiz.getQuestionTypes().toPromise();
    if(!data.hasError){
      this.allQuestionTypes = data.result;
    }
  }


}
