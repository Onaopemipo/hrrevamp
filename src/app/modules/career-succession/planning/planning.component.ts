import { TableColumn } from './../../../components/tablecomponent/models';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit {
  successionTable: TableColumn [] = [
    {name: 'position', title: 'Position'},
    {name: 'employee', title: 'Employee'},
    {name: 'department', title: 'Department'},
    {name: 'unit', title: 'Unit/Division'},
    {name: 'level', title: 'Level'}
  ];
  constructor(private navCtrl: Location) { }

  ngOnInit(): void {
  }


  goback() {
    this.navCtrl.back();
  }
  addPlan(){

  }

}
