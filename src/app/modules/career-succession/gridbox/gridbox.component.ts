import { TableColumn } from 'app/components/tablecomponent/models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-gridbox',
  templateUrl: './gridbox.component.html',
  styleUrls: ['./gridbox.component.scss']
})
export class GridboxComponent implements OnInit {
  appraisalTable: TableColumn [] = [
    {name: 'name', title: 'Name'},
    {name: 'id', title: 'ID'},
    {name: 'department', title: 'Department'},
    {name: 'unit', title: 'Unit'},
    {name: 'position', title: 'Position'}

  ];
  constructor() { }

  ngOnInit(): void {
  }

}
