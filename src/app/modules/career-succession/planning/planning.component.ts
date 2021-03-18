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
    {name: 'title', title: 'Title'},
    {name: 'employee', title: 'Employee'},
    {name: 'position', title: 'Position'},
    {name: 'candidate', title: 'Candidate'},
    {name: 'readiness', title: 'Readiness to Start'},
    {name: 'purpose', title: 'Purpose'}
  ];

  newPlan: boolean = false;

  constructor(private navCtrl: Location) { }

  ngOnInit(): void {
  }


  goback() {
    this.navCtrl.back();
  }
  addPlan(){
    this.newPlan = !this.newPlan;
  }

}
