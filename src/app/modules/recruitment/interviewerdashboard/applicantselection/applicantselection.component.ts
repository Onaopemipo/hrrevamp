import { TableColumn } from './../../../../components/tablecomponent/models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-applicantselection',
  templateUrl: './applicantselection.component.html',
  styleUrls: ['./applicantselection.component.scss']
})
export class ApplicantselectionComponent implements OnInit {

  myApplicantTable: TableColumn [] = [
    {name: 'name', title: 'Name'},
    {name: 'email', title: 'Email'},
    {name: 'role', title: 'Role'},
    {name: 'dateApplied', title: 'Date Applied'}];
  constructor() { }

  ngOnInit(): void {
  }

}
