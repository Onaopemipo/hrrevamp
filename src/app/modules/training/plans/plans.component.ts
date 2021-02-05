import { TopAction } from './../../../components/componentsheader/models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {

  actions: TopAction[] = [
    {name: 'create', label: 'Create New', icon: 'plus'}
  ];

  welcome: boolean = true;
  newTrainingWindow: boolean = false;
  calendarWindow: boolean = false;
  trainingType: boolean = true;
  newTrainingType: boolean = false;
  trainingCategory: boolean = true;
  category = 'Internal';

  TrainingPlanData = '';
  // TrainingPlanq = '';

  addVendor = 'Add New Vendor';
  addType = 'Add Training Type';

  ngOnInit(): void {

  }

  get pagetitle() {
    return 'Training Plan';
  }

  addTrainingPlan() {
    this.calendarWindow = true;
    this.welcome = false;
  }

  uploadVendor() {
    this.calendarWindow = true;
    this.newTrainingWindow = false;
    this.welcome = false;
  }

  addNewTraining() {
    this.newTrainingType = true;
    this.trainingType = false;
  }

  changed(data) {

  }
}


