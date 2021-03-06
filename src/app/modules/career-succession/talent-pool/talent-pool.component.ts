import { TableColumn } from './../../../components/tablecomponent/models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-talent-pool',
  templateUrl: './talent-pool.component.html',
  styleUrls: ['./talent-pool.component.scss']
})
export class TalentPoolComponent implements OnInit {

  talentPoolTable: TableColumn [] = [
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
