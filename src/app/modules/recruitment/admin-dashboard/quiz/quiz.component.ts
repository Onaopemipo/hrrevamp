import { Router } from '@angular/router';
import { AlertserviceService } from './../../../../_services/alertservice.service';
import { IDTextViewModel } from 'app/_services/service-proxies';
import { RecruitmentQuizServiceProxy, QuizDTO, ManageQuizDTO, QuestionDTO, QuestionOptionDTO } from './../../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  optionTypes = [
    {id: 0, label: 'Multiple Choice'},
    {id: 1, label: 'True/False'},
    {id: 2, label: 'Long Text'},
    {id: 3, label: 'Description'},
  ];

  multiChoice: QuestionOptionDTO[] = [];
  booleanChoice = [
    { id: 0, label: 'A', value: 'True'},
    { id: 1, label: 'B', value: 'False'},
];

  pagetitle: string = 'Quiz';
  allQuizTypes: IDTextViewModel [] = [];
  allQuestionTypes: IDTextViewModel [] = [];
  allQuizes: QuizDTO [] = [];
  quizId:number = 0;
  updateQuiz: boolean = false;
  myQuiz: QuizDTO = new QuizDTO().clone();
  newQuizModel: ManageQuizDTO = new ManageQuizDTO();
  allQuestions: QuestionDTO [] = [];
  questionModel: QuestionDTO = new QuestionDTO();
  questionOptionModel: QuestionOptionDTO = new QuestionOptionDTO();
  myOptionType: number;
  loading: boolean = false;

  constructor(private quiz: RecruitmentQuizServiceProxy, private alertMe: AlertserviceService, private router: Router) { }

  ngOnInit(): void {
    this.fetchQuestionTypes();
    this.fetchQuizTypes();
    this.fetchAllQuizes();

  }

  onChange(event){
    this.myOptionType = event;
  }

  addNewQuestion(){
    this.questionModel.questionOptions = this.multiChoice;
    this.allQuestions.push(this.questionModel);
    this.questionModel = new QuestionDTO();
    this.multiChoice = [];
  }

  removeQuestion(question, id){

  }

  addNewQuiz() {
    this.loading = true;
    this.newQuizModel.typeId = 1;
    this.quiz.addUpdateQuiz(this.newQuizModel).subscribe(data => {
      this.loading = false;
      if(!data.hasError && data.result.isSuccessful == true){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Quiz Added!', 'Dismiss');
      }
    }, (error) => {

      if (error.status == 400) {
        this.alertMe.openCatchErrorModal(this.alertMe.ALERT_TYPES.FAILED, error.title, "OK", error.errors);
      }
    });
  }

  toggleNewQuiz(){
    this.router.navigateByUrl('/recruitmentadmin/newquiz');
  }

  updateMyQuiz(){
    // this.updateQuiz = true;

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

  async fetchAllQuizes(){
    const data = await this.quiz.getAllQuizzes().toPromise();
    if(!data.hasError){
      this.allQuizes = data.result;
    }
  }

  cancelUpdate(){

  }

  fetchSingleQuiz(id){
  this.updateQuiz = true;
   this.quiz.getQuiz(id).subscribe( data => {
    if(!data.hasError){
      this.myQuiz = data.result;
      this.allQuestions = data.result.questions;
    }
   });
  }

}
