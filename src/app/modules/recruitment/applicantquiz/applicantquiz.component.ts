import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-applicantquiz',
  templateUrl: './applicantquiz.component.html',
  styleUrls: ['./applicantquiz.component.scss']
})
export class ApplicantquizComponent implements OnInit {
  nextQuestion: boolean = false;
  constructor(private navCtrl: Location ) { }

  ngOnInit(): void {
  }

  gotoNextQuestion(){
    this.nextQuestion = !this.nextQuestion;
  }

  goback(){
    this.navCtrl.back();
  }
}
