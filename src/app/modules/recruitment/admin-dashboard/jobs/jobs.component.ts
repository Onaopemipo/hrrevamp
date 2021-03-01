import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  myPlanHeader: string = 'You have not setup any Training Plan';
  myPlanDesc: string = 'Click on the button to start your set up';

  myButton: string = 'Setup Training Plan';
  constructor() { }

  ngOnInit(): void {
  }

  addNewJob() {

  }

}
