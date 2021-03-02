import { TableColumn } from './../../../../components/tablecomponent/models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  reportTable: TableColumn [] = [
    {name: 'jobTitle', title: 'Job Title'},
    {name: 'department', title: 'Department'},
    {name: 'applicants', title: 'Applicants'},
    {name: 'datePosted', title: 'Date Posted'},
    {name: 'status', title: 'Status'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
