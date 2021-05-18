import { AlertserviceService } from './../../../../_services/alertservice.service';
import { IDTextViewModel } from 'app/_services/service-proxies';
import { RecruitmentQuizServiceProxy, QuizDTO, ManageQuizDTO } from './../../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  pagetitle: string = 'Quiz';
  allQuizTypes: IDTextViewModel [] = [];
  allQuestionTypes: IDTextViewModel [] = [];
  allQuizes: QuizDTO [] = [];
  quizId:number = 0;
  myQuiz: QuizDTO = new QuizDTO();
  newQuizModel: ManageQuizDTO = new ManageQuizDTO();

  constructor(private quiz: RecruitmentQuizServiceProxy, private alertMe: AlertserviceService) { }

  ngOnInit(): void {
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

  async fetchAllQuizes(){
    const data = await this.quiz.getAllQuizzes().toPromise();
    if(!data.hasError){
      this.allQuizes = data.result;
    }
  }

  async fetchSingleQuiz(){
    const data = await this.quiz.getQuiz(this.quizId).toPromise();
    if(!data.hasError){
      this.myQuiz = data.result;
    }
  }

}
