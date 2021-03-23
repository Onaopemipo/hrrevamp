import { TableColumn } from 'app/components/tablecomponent/models';
import { TopAction } from './../../../components/componentsheader/models';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { NbTabComponent } from '@nebular/theme';
import { BaseComponent } from 'app/components/base/base.component';

enum TABS {
  pending = 'pending', approved = 'approved', declined = 'declined'
}
@Component({
  selector: 'ngx-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent {

  actions: TopAction[] = [
    {name: 'create', label: 'Create New', icon: 'plus'}
  ];

  myPlanHeader: string = 'You have not setup any Training Plan';
  myPlanDesc: string = 'Click on the button to start your set up';

  myButton: string = 'Setup Training Plan';

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: [
      { title: 'event 1', date: '2021-02-08' },
      { title: 'event 2', date: '2019-04-02' }
    ],
    eventClick: (ev) => { alert(ev); }
  };

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


  myTable: TableColumn [] = [
  {name: 'trainingType', title: 'Type'},
  {name: 'specialiazation', title: 'Specialiazation'},
  {name: 'vendor', title: 'Vendor'},
  {name: 'budget', title: 'Budget'},
  {name: 'startDate', title: 'Start Date'},
  {name: 'endDate', title: 'End Date'},
  {name: 'status', title: 'Status'},
];

  ngOnInit(): void {

  }

  get pagetitle() {
    return 'Training Plan';
  }

  addTrainingPlan() {
    // this.newTrainingWindow = true;
    this.welcome = false;
    this.showModal = true;
  }

  uploadVendor() {
    this.calendarWindow = true;
    this.newTrainingWindow = false;
    this.welcome = false;
  }

  addNewTraining() {
    this.newTrainingType = true;
    this.trainingType = false;
    this.showModal = true;
  }

  changed(data) {

  }

  TABS = TABS;
  selectedTab = TABS.pending;
  showModal = false;

  tabSelected(tab: NbTabComponent) {
    const b: any = tab.tabId;
    console.log(tab);
    this.selectedTab = b;
  }
}


