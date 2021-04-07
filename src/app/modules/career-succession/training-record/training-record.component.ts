import { TableColumn } from './../../../components/tablecomponent/models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-training-record',
  templateUrl: './training-record.component.html',
  styleUrls: ['./training-record.component.scss']
})
export class TrainingRecordComponent implements OnInit {

  ongoingTable: TableColumn [] = [
    {name: 'name', title: 'Name'},
    {name: 'id', title: 'ID'},
    {name: 'department', title: 'Department'},
    {name: 'unit', title: 'Unit'}
  ];

  yetToStartTable: TableColumn [] = [
    {name: 'name', title: 'Name'},
    {name: 'id', title: 'ID'},
    {name: 'department', title: 'Department'},
    {name: 'unit', title: 'Unit'}
  ];

  completedTable: TableColumn [] = [
    {name: 'name', title: 'Name'},
    {name: 'id', title: 'ID'},
    {name: 'department', title: 'Department'},
    {name: 'unit', title: 'Unit'}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
