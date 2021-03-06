import { TableColumn } from './../../../components/tablecomponent/models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {

  reportListTable: TableColumn [] = [
    {name: 'name', title: 'Name'},
    {name: 'position', title: 'Position'},
    {name: 'experience', title: 'Experience'},
    {name: 'qualification', title: 'Qualification'},
    {name: 'certification', title: 'certification'},
    {name: 'skills', title: 'Skills'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
