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

  constructor() { }

  ngOnInit(): void {
  }
}
