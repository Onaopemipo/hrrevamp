import { TableColumn } from './../../../../components/tablecomponent/models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  myPlanHeader: string = 'You have not posted any Job';
  myPlanDesc: string = 'Click on the button to post a job';

  myButton: string = 'Add a Job Posting';
  availability: string = 'Physical';
  employmentType: string = 'Full Time';
  newJob: boolean = false;
  allJobs: string = '';

  postedJobsTable: TableColumn [] = [
    {name: 'jobTitle', title: 'Job Title'},
    {name: 'department', title: 'Department'},
    {name: 'applicants', title: 'Applicants'},
    {name: 'datePosted', title: 'Date Posted'},
    {name: 'status', title: 'Status'},
  ];

  scheduledJobsTable: TableColumn [] = [
    {name: 'jobTitle', title: 'Job Title'},
    {name: 'department', title: 'Department'},
    {name: 'scheduledDate', title: 'Scheduled Date'},
  ];

  draftedJobsTable: TableColumn [] = [
    {name: 'jobTitle', title: 'Job Title'},
    {name: 'department', title: 'Department'},
  ];

  selectedOption;
  constructor() {
   }

  ngOnInit(): void {
  }

  addNewJob() {
    console.log('Hiya!');
    this.newJob = true;
  }

}
